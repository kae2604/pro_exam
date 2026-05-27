import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@components/header";
import Footer from "@components/footer";
import BreadcrumbsComponent, { clearBreadcrumbsHistory } from "@components/breadcrumbsComponent";

const MainLayout = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        if (pathname === '/') {
            clearBreadcrumbsHistory();
        }
        window.scrollTo(0, 0);
    }, [pathname]);

    const isHomePage = pathname === '/';

    return (
        <>
            <Header />

            <main className="main">
                {!isHomePage && (
                    <BreadcrumbsComponent />
                )}

                <Outlet />
            </main>

            <Footer />
        </>
    );
};

export default MainLayout;