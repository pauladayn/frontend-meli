import React from "react";
import ProductList from "./client/components/templates/ProductList";
import Header from "./client/components/organisms/Header";
import LoggedLayout from "./client/components/templates/LoggedLayout";
import { Route, Routes } from "react-router";
import ProductCardDetail from "./client/components/molecules/ProductCardDetail";
import CategoriesBreadcrumb from "./client/components/molecules/CategoriesBreadcrumb";
import AuthLayout from "./client/components/templates/AuthLayout";
import Home from "./client/Home";
import { Item, ItemDetails } from "./types";

type BaseApiResponse = {
    loggedIn: boolean;
    query: string;
    categories: Array<string>;
};
type ItemsApiResponse = ItemDetails | Array<Item>;
type ApiResponseData = BaseApiResponse & ItemsApiResponse;
export default function App(data: ApiResponseData) {
    const { loggedIn } = data;

    return (
        <main>
            {!loggedIn ? (
                <AuthLayout />
            ) : (
                <>
                    <Header query={data.query} />
                    <LoggedLayout>
                        {data.categories && (
                            <CategoriesBreadcrumb
                                categories={data.categories}
                            />
                        )}
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route
                                path='/items'
                                element={<ProductList {...data} />}
                            />
                            <Route
                                path='/items/:id'
                                element={<ProductCardDetail {...data} />}
                            />
                        </Routes>
                    </LoggedLayout>
                </>
            )}
        </main>
    );
}
