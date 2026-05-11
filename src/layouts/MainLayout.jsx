import { Outlet ,  useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@components/header/Header.jsx";
import Footer from "@components/footer/Footer.jsx";

const MainLayout = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <Header />

            <main className="main">
                <Outlet />
            </main>

            <Footer />
        </>
    );
};

export default MainLayout;
