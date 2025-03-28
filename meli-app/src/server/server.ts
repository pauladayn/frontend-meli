import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { renderToPipeableStream } from "react-dom/server";
import { createElement } from "react";
import { StaticRouter } from "react-router";
import { createServer as createViteServer } from "vite";
import type { ViteDevServer } from "vite";
import path from "path";
import compression from "compression";
import sirv from "sirv";
import App from "../App";
import itemRouter from './routes/items';
import authRouter from "./routes/auth";
import { findRouteHandler } from "./handlers/routeHandlers";
import errorHandler from "./services/helpers/errorHandler";
import { getAccessToken } from "./services/Auth";
import { AUTHOR } from "./utils/constants";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 3000;
const base = process.env.BASE || "/";
const app = express();


async function startServer() {

    if (!isProduction) {
        // MODO DESARROLLO: Usamos Vite como middleware
        const vite: ViteDevServer = await createViteServer({
            server: { middlewareMode: true },
            appType: "custom",
            base,
        });
        app.use(vite.middlewares);
    } else {
        // MODO PRODUCCIÓN: Servimos "dist" + compresión
        app.use(compression());
        app.use(sirv(path.join(__dirname, "../../dist"), {
            extensions: []
        }));
    }
}

app.use('/public', express.static('./public'));
app.use('/api', itemRouter);
app.use(authRouter);

//SSR
app.get("*", async (req, res, next) => {
    try {
        // Si no hay token, renderizamos la app con loggedIn: false
        if (!getAccessToken()) {

            const defaultData = {
                loggedIn: false,
                author: AUTHOR,
                items: [],
                categories: [],
                type: "list",
                query: "",
            };
            const noTokenElement = createElement(
                StaticRouter,
                { location: req.url },
                //@ts-expect-error App acá no tiene datos
                createElement(App, {
                    ...defaultData,
                })
            );

            const { pipe: pipeNoToken } = renderToPipeableStream(noTokenElement, {
                onShellReady() {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "text/html");
                    res.write(`<!DOCTYPE html>
              <html>
                <head>
                  <meta charset="UTF-8" />
                  <title>Mercado Libre</title>
                  <link rel="stylesheet" href="/public/index.css" />
                  <link rel="icon" type="image/svg+xml" href="/public/favicon.ico" />
                </head>
                <body>
                  <div id="root">`);
                    pipeNoToken(res);
                },
                onAllReady() {
                    res.write(`</div></body></html>`);
                    res.end();
                },
                onError(err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send("Internal Server Error");
                },
            });
            return;
        }

        // Si hay token, seguimos con la lógica normal:
        const handler = findRouteHandler(req.path);
        if (!handler) {
            res.status(404).send("Not Found");
            return;
        }

        const { meta, data } = await handler(req);

        const hasTokenElement = createElement(
            StaticRouter,
            { location: req.url },
            //@ts-expect-error props
            createElement(App, { ...data, loggedIn: true })
        );

        const { pipe } = renderToPipeableStream(hasTokenElement, {
            onShellReady() {
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/html");
                res.write(`<!DOCTYPE html>
            <html>
              <head>
                <meta charset="UTF-8" />
                <title>${meta.title || "Mercado Libre"}</title>
                <meta name="description" content="${meta.description || ""}" />
                <link rel="stylesheet" href="/public/index.css" />
                <link rel="icon" type="image/svg+xml" href="/public/favicon.ico" />
              </head>
              <body>
                <div id="root">`);
                pipe(res);
            },
            onAllReady() {
                res.write(`</div></body></html>`);
                res.end();
            },
            onError(err) {
                console.error(err);
                res.statusCode = 500;
                res.send("Internal Server Error");
            },
        });
    } catch (error) {
        next(error);
    }
});

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

startServer().catch((err) => {
    console.error(err);
    process.exit(1);
});

