import { Outlet } from "react-router-dom";
import Header from "@components/header/Header.jsx";
import Footer from "@components/footer/Footer.jsx";

const MainLayout = () => {
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
