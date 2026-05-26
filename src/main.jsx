import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router/dom";
import {Provider} from "react-redux";
import routerConfig from "@router/routerConfig.jsx";
import store from "@store";
import "./styles/reset.css";
import "./styles/main.css";

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={routerConfig} />
    </Provider>
)
