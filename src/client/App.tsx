import React, { Suspense } from "react";
import "@/styles/main.scss";
import Header from "@/components/organisms/Header";
import ProductGrid from "@/components/templates/ProductGrid";
import MainLayout from "@/components/templates/MainLayout";

function App({ data }: { data: any }) {
    console.log("data en app", data);

    return (
        <>
            <Header />

            <MainLayout>
                <Suspense fallback={<div>loading....</div>}>
                    <ProductGrid data={data} />
                </Suspense>
            </MainLayout>
        </>
    );
}

export default App;
