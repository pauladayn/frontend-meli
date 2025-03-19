import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App";

const dataScript = document.getElementById("__DATA__");
const data = dataScript ? JSON.parse(dataScript.textContent || "{}") : null;

if (!data) {
    console.error("No data found in window.__DATA__");
} else {
    hydrateRoot(
        document.getElementById("root") as HTMLElement,
        <StrictMode>
            <App data={data} />
        </StrictMode>
    );
}
