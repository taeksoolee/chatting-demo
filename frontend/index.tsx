import { createElement } from "react";
import { createRoot } from "react-dom/client";
import 'frontend/css/style.scss';
import { App } from "./App";

const root = createRoot(document.getElementById("app")!);
root.render(createElement(App));