import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./routes/AppRouter.jsx";
import {Provider} from 'react-redux'
import {myStore} from './redux/store.js'

createRoot(document.getElementById("root")).render(
    <Provider store={myStore} >
        <AppRouter />
    </Provider>
);
