import { createElement } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import './App.css';

createRoot(document.getElementById("outlet")!).render(createElement(App));
