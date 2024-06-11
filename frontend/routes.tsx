import MainView from "Frontend/views/MainView";
import Login from "Frontend/views/Login";
import Chat from "Frontend/views/Chat";
import {
    createBrowserRouter,
    RouteObject
} from "react-router-dom";

export const routes: readonly RouteObject[] = [
    { path: "/", element: <Chat /> },//Home
    { path: "/login", element: <Login /> },
    { path: "/chat", element: <Chat /> },
];

export const router = createBrowserRouter([...routes], {basename: new URL(document.baseURI).pathname });
