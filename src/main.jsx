import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./output.css";
import "@fontsource/poppins"; // نصب فونت Poppins
import "@fontsource/inter";
import 'react-toastify/dist/ReactToastify.css';

import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./Context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
