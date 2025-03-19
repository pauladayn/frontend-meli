import React, { ReactNode } from "react";
import CategoriesBreadcrumb from "@/components/molecules/CategoriesBreadcrumb";

const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main>
            <div className='container'>
                <CategoriesBreadcrumb />
                {children}
            </div>
        </main>
    );
};

export default MainLayout;
