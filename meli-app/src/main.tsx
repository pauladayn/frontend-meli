import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.js";
import "../public/index.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <App
                loggedIn={false}
                query=''
                categories={[]}
                type='list'
                author={{ name: "", lastname: "" }}
                items={[]}
            />
        </BrowserRouter>
    </StrictMode>
);
