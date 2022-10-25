import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/app";
import "./index.css";

// Селектор вывода
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
// Элемент основного компанента
const el = <App />;
// Рендиринг
root.render(el);
