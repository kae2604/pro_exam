import {createBrowserRouter} from "react-router";

 const routerConfig = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello World</div>,
    },
    {
        path: "/about",
        element: <div>About Hello World</div>,
    },
]);
export default routerConfig