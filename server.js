import fs from "node:fs/promises";
import express from "express";
import 'dotenv/config';
import apiRoutes from "./src/api/routes/itemRoutes.js";
import errorHandler from "./src/api/services/errorHandler.js";

// Constants
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";

// Cached production assets
const templateHtml = isProduction
    ? await fs.readFile("./dist/client/index.html", "utf-8")
    : "";

// Create http server
const app = express();

app.use(express.json());
app.use("/api", apiRoutes);

// Add Vite or respective production middlewares
/** @type {import('vite').ViteDevServer | undefined} */
let vite;
if (!isProduction) {
    const { createServer } = await import("vite");
    vite = await createServer({
        server: { middlewareMode: true },
        appType: "custom",
        base,
    });
    app.use(vite.middlewares);
} else {
    const compression = (await import("compression")).default;
    const sirv = (await import("sirv")).default;
    app.use(compression());
    app.use(base, sirv("./dist/client", { extensions: [] }));
}

// Serve HTML
app.use("*all", async (req, res) => {
    try {
        const url = req.originalUrl.replace(base, "");

        /** @type {string} */
        let template;
        /** @type {import('./src/entry-server.ts').render} */
        let render;
        if (!isProduction) {
            // Always read fresh template in development
            template = await fs.readFile("./index.html", "utf-8");
            template = await vite.transformIndexHtml(url, template);
            render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
        } else {
            template = templateHtml;
            render = (await import("./dist/server/entry-server.js")).render;
        }

        const rendered = await render(url);

        const html = template
            .replace(`<!--app-head-->`, rendered.head ?? "")
            .replace(`<!--app-html-->`, rendered.html ?? "");

        res.status(200).set({ "Content-Type": "text/html" }).send(html);
    } catch (e) {
        vite?.ssrFixStacktrace(e);
        console.log(e.stack);
        res.status(500).end(e.stack);
    }
});

app.get("/callback", async (req, res) => {
    try {
        const { code } = req.query;

        if (!code) {
            return res
                .status(400)
                .json({ error: "Authorization code is required" });
        }

        const response = await fetch(
            "https://api.mercadolibre.com/oauth/token",
            {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "content-type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    grant_type: "authorization_code",
                    client_id: process.env.CLIENT_ID,
                    client_secret: process.env.CLIENT_SECRET,
                    code: code,
                    redirect_uri: "https://frontend-meli.onrender.com/callback",
                }),
            }
        );

        if (!response.ok) {
            throw new Error(
                `Error from Mercado Libre API: ${response.statusText}`
            );
        }

        const data = await response.json();
        const accessToken = data.access_token;
        console.log(accessToken);
        res.json({ accessToken });
    } catch (error) {
        console.error("Error during OAuth callback:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.use(errorHandler);

// Start http server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
