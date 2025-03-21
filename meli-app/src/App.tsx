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
import ErrorPage from "./client/components/templates/ErrorPage";
import { ErrorBoundary } from "react-error-boundary";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ErrorFallback({ error, resetErrorBoundary }: any) {
    return (
        <div className="container">
            <div className="row card error-layout">
                <div className="col-12">
                    <div className="center error-layout__content">
                        <p>Ocurrió un error inesperado: {error.message}</p>
                        <button onClick={resetErrorBoundary} className="main-btn">
                            Intentar de nuevo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default function App(
    data: ApiResponseData = {
        loggedIn: false,
        query: "",
        categories: [],
        type: "list",
        author: { name: "", lastname: "" },
        items: [],
    }
) {
    const { loggedIn, query, categories } = data;
    const productListProps = getProductListProps(data);

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
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
                                    element={
                                        <ProductList {...productListProps} />
                                    }
                                />
                                <Route
                                    path='/items/:id'
                                    element={
                                        <ProductCardDetail
                                            {...getProductDetailProps(data)}
                                        />
                                    }
                                />
                                <Route path='*' element={<ErrorPage />} />
                            </Routes>
                        </LoggedLayout>
                    </>
                )}
            </main>
        </ErrorBoundary>
    );
}
