import React, { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
    return <div className='container'>{children}</div>;
};

export default MainLayout;
