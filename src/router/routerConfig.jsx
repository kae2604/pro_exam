import { createBrowserRouter } from "react-router-dom";
import HomePage from "@pages/homePage";
import MainLayout from "@/layouts/MainLayout.jsx";
import CategoryPage from "@pages/categoryPage";
import ProductDetailPage from "@pages/productDetailPage"



 const routerConfig = createBrowserRouter([
    {
        path: "/", element: <MainLayout/>,
        children: [
            {index: true, element: <HomePage/> },
            {path: "products/category/:slug", element: <CategoryPage/>},
            {path: "products/category", element: <CategoryPage/>},
            {path: "products/:id", element: <ProductDetailPage/>},
            // {path: "products/product/:id", element: <Product/>}
            // { path: "cart", element: <CartPage /> },
        ]
    }
]);
export default routerConfig