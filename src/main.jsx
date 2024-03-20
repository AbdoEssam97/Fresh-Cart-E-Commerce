import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "bootstrap/dist/js/bootstrap.min.js";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "../node_modules/animate.css";

import { QueryClient, QueryClientProvider } from "react-query";
import UserContextProvider from "./Context/UserContext.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <App />
    </UserContextProvider>
    {/* <ReactQueryDevtools initialIsOpen="false" position="bottom-right" /> */}
  </QueryClientProvider>
);
