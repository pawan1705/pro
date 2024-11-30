import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import GeminiProvider from "./context/geminiContext";
// dotenv.config();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <GeminiProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GeminiProvider>
  </AuthProvider>
);

reportWebVitals();
