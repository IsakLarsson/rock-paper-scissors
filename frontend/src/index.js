import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import Gamepage from "./Pages/Gamepage";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ChakraProvider>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/:id" element={<Gamepage />} />
                </Routes>
            </ChakraProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
