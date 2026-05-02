import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header.jsx";
import Footer from "src/components/layout/Footer/Footer.jsx";

const MainLayout = () => {
    return (
        <>

            <Header />
            <Outlet />
            <Footer />
        </>
    );
};



export default MainLayout;
