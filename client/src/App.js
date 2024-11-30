import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";
import { themeSettings } from "./theme";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import First from "./pages/First";
import PrivateRoute from "./components/Routes/private";
import Content from "./components/Content";
import ChangePassword from "./pages/ChangePassword";

function App() {
  const theme = useMemo(() => createTheme(themeSettings()), []);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Toaster />

        <Routes>
          <Route path="/" element={<First />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chatbot" element={<PrivateRoute />}>
            <Route path="" element={<Content />}></Route>
          </Route>
          <Route path="/forgot-password" element={<ChangePassword />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
