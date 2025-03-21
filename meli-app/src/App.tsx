import ProductList from "./client/components/templates/ProductList";
import Header from "./client/components/organisms/Header";
import LoggedLayout from "./client/components/templates/LoggedLayout";
import { Route, Routes } from "react-router";
import ProductCardDetail from "./client/components/molecules/ProductCardDetail";
import CategoriesBreadcrumb from "./client/components/molecules/CategoriesBreadcrumb";
import AuthLayout from "./client/components/templates/AuthLayout";
import Home from "./client/Home";
import { ApiResponseData } from "./DTOtypes";
import {
    getProductDetailProps,
    getProductListProps,
} from "./server/utils/typeValidators";

export default function App(data: ApiResponseData) {
    const { loggedIn, query, categories } = data;
    const productListProps = getProductListProps(data);

    return (
        <main>
            {!loggedIn ? (
                <AuthLayout />
            ) : (
                <>
                    <Header query={query} />
                    <LoggedLayout>
                        {data.categories && (
                            <CategoriesBreadcrumb categories={categories} />
                        )}
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route
                                path='/items'
                                element={<ProductList {...productListProps} />}
                            />
                            <Route
                                path='/items/:id'
                                element={
                                    <ProductCardDetail
                                        {...getProductDetailProps(data)}
                                    />
                                }
                            />
                        </Routes>
                    </LoggedLayout>
                </>
            )}
        </main>
    );
}
