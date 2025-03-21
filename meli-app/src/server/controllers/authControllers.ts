import { Request, Response } from "express";
import axios from "axios";
import API_URLS from "../config/apiConfig";
import { setTokens } from "../services/Auth";


export function handleLogin(req: Request, res: Response) {
    const clientId = process.env.CLIENT_ID!;
    const redirectUri = process.env.CALLBACK_URI!;

    const url = new URL(API_URLS.AUTHORIZATION);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("client_id", clientId);
    url.searchParams.set("redirect_uri", redirectUri);

    // url.searchParams.set("scope", "read");

    return res.redirect(url.toString());
}

export async function handleCallback(req: Request, res: Response) {
    const code = req.query.code as string | undefined;
    if (!code) {
        return res.status(400).send("Missing code param");
    }

    try {
        const response = await axios.post(API_URLS.TOKEN, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            data: new URLSearchParams({
                grant_type: "authorization_code",
                client_id: process.env.CLIENT_ID!,
                client_secret: process.env.CLIENT_SECRET!,
                code: code,
                redirect_uri: process.env.CALLBACK_URI!,
            }).toString(),
        });

        const data = await response.data;
        console.log("ML /oauth/token response:", data);

        if (data.error) {
            return res.status(500).send(`Error from ML: ${data.error_description}`);
        }

        ACCESS_TOKEN = data.access_token;
        REFRESH_TOKEN = data.refresh_token;

        return res.redirect("/");
    } catch (err) {
        console.error("Error exchanging code for token:", err);
        return res.status(500).send("Internal Server Error");
    }
}
