import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

import { ProductsProvider } from "./frontend/context/productsContext";
import { AuthProvider } from "./frontend/context/authContext";
import { CartProvider } from "./frontend/context/cartContext";
// Call make Server
makeServer();
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductsProvider>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </ProductsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
