import React from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Login from 'Frontend/views/Login';
import Register from 'Frontend/views/Register';
import Chat from 'Frontend/views/Chat';
import PrivateRoute from 'Frontend/PrivateRoute'; // Importe o componente PrivateRoute

const routes: RouteObject[] = [
    { path: "/", element: <Login /> }, // Home
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    {
        path: "/",
        element: <PrivateRoute />, // Rota protegida
        children: [
            { path: "/chat", element: <Chat /> },
        ],
    },
];

export const router = createBrowserRouter(routes, { basename: new URL(document.baseURI).pathname });
