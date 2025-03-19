import React from "react";
import "@/styles/main.scss";
import Header from "@/components/organisms/Header";
import ProductGrid from "@/components/templates/ProductGrid";
import MainLayout from "@/components/templates/MainLayout";

function App() {
    // const handleLogin = async () => {
    //     if (process.env.NODE_ENV === "development") {
    //         const accessToken = process.env.ACCESS_TOKEN;
    //         console.log("Using hardcoded token in development:", accessToken);

    //         document.cookie = `access_token=${accessToken}; path=/; max-age=3600`;
    //         window.location.href = "/";
    //     } else {
    //         try {
    //             const response = await fetch(
    //                 "https://frontend-meli.onrender.com/auth/meli",
    //                 {
    //                     method: "GET",
    //                 }
    //             );
    //             const data = await response.json();
    //             console.log("data", data);

    //             if (data.redirectUrl) {
    //                 window.location.href = data.redirectUrl;
    //             }
    //         } catch (error) {
    //             console.error("error", error);
    //         }
    //     }
    // };

    return (
        <>
            <Header />
            <MainLayout>
                <ProductGrid />
            </MainLayout>
        </>
    );
}

export default App;
