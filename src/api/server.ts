import fs from "node:fs/promises";
import express from "express";
import 'dotenv/config';
import { ViteDevServer } from "vite";
import compression from "compression";
import errorHandler from "./services/helpers/errorHandler";
import ssrMiddleware from "./middleware/ssrMiddleware";


// Constants
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";

//agregar a package json
//"build:client": "vite build --outDir dist/client --ssrManifest",

// Cached production assets
const templateHtml = isProduction
    ? await fs.readFile("./dist/client/index.html", "utf-8")
    : "";
const ssrManifest = isProduction ? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8') : undefined;

// Create http server
const app = express();

app.use(express.json());
//app.use("/api", apiRoutes);
app.use(ssrMiddleware)

// Add Vite or respective production middlewares
/** @type {import('vite').ViteDevServer | undefined} */
let vite: ViteDevServer;
if (!isProduction) {
    const { createServer } = await import("vite");
    vite = await createServer({
        server: { middlewareMode: true },
        appType: "custom",
        base,
    });
    app.use(vite.middlewares);
} else {
    // const compression = (await import("compression")).default;
    const sirv = (await import("sirv")).default;
    app.use(compression().default);
    app.use(base, sirv("./dist/client", { extensions: [] }));
}

// Serve HTML
app.use("*all", async (req, res) => {
    try {
        const url = req.originalUrl.replace(base, "");
        const data = res.locals.data;
        /** @type {string} */
        let template;
        /** @type {import('../entry-server.tsx').render} */
        let render;
        if (!isProduction) {
            // Always read fresh template in development
            template = await fs.readFile("./index.html", "utf-8");
            template = await vite.transformIndexHtml(url, template);
            render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
        } else {
            template = templateHtml;
            // @ts-ignore
            render = (await import("../../dist/server/entry-server.js")).render;
        }

        const rendered = await render(url);
        //log('rendered-------', rendered)
        const html = template
            .replace(`<!--app-head-->`, rendered.head ?? "")
            .replace(`<!--app-html-->`, rendered.html ?? "")
            .replace(
                '<script id="__DATA__" type="application/json"></script>',
                `<script id="__DATA__" type="application/json">${JSON.stringify(data)}</script>`
              );

        res.status(200).set({ "Content-Type": "text/html" }).send(html);
    } catch (e) {
        if (e instanceof Error) {

            vite?.ssrFixStacktrace(e);
            console.log(e.stack);
            res.status(500).end(e.stack);
        } else {
            res.status(500).end("Unknown error");
        }
    }
});

// app.get("/callback", async (req: express.Request, res: express.Response) => {
//     try {
//         const { code } = req.query;

//         if (!code) {
//             return res
//                 .status(400)
//                 .json({ error: "Authorization code is required" });
//         }

//         const response = await fetch(
//             "https://api.mercadolibre.com/oauth/token",
//             {
//                 method: "POST",
//                 headers: {
//                     accept: "application/json",
//                     "content-type": "application/x-www-form-urlencoded",
//                 },
//                 body: new URLSearchParams({
//                     grant_type: "authorization_code",
//                     client_id: process.env.CLIENT_ID,
//                     client_secret: process.env.CLIENT_SECRET,
//                     code: code,
//                     redirect_uri: "https://frontend-meli.onrender.com/callback",
//                 }),
//             }
//         );

//         if (!response.ok) {
//             throw new Error(
//                 `Error from Mercado Libre API: ${response.statusText}`
//             );
//         }

//         const data = await response.json();
//         const accessToken = data.access_token;
//         console.log(accessToken);
//         res.json({ accessToken });
//     } catch (error) {
//         console.error("Error during OAuth callback:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

app.use(errorHandler);

// Start http server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
