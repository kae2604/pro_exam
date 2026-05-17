import { createBrowserRouter } from "react-router-dom";
import HomePage from "@pages/homePage";
import MainLayout from "@/layouts/MainLayout.jsx";
import CategoryPage from "@pages/categoryPage";
import ProductDetailPage from "@pages/productDetailPage"
import CartPage from "@pages/cartPage"



 const routerConfig = createBrowserRouter([
    {
        path: "/", element: <MainLayout/>,
        children: [
            {index: true, element: <HomePage/> },
            {path: "category/:category", element: <CategoryPage/>},
            {path: "category", element: <CategoryPage/>},
            {path: "products/:id", element: <ProductDetailPage/>},
            {path: "cart", element: <CartPage/>},
        ]
    }
]);
export default routerConfig