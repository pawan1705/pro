import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useAuth } from "../context/auth";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
} from "@mui/material";

const Login = () => {
  const location = useLocation();
  const theme = useTheme();
  const navigate = useNavigate();
  //media
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState("");
  const [auth, setAuth] = useAuth();

  //register ctrl
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`api/v1/auth/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        setInterval(() => {
          navigate(location.state || "/chatbot");
        }, 300);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>SearchAI - SignIn</title>
      </Helmet>

      <Box
        width={isNotMobile ? "40%" : "80%"}
        p={"3rem"}
        m={"4rem auto"}
        borderRadius={5}
        sx={{ boxShadow: 5 }}
        backgroundColor={theme.palette.background.new}
      >
        <Collapse in={error}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        </Collapse>
        <form onSubmit={handleSubmit}>
          <Typography variant="h3">Sign In</Typography>

          <TextField
            style={{ background: "white" }}
            label="email"
            type="email"
            required
            margin="normal"
            fullWidth
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            style={{ background: "white" }}
            label="password"
            type="password"
            required
            margin="normal"
            fullWidth
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ color: "white", mt: 2 }}
          >
            Sign In
          </Button>
          <Typography mt={2}>
            {" "}
            <Link style={{ color: "#b536cb " }} to="/forgot-password">
              Forgot Password
            </Link>
          </Typography>
          <Typography mt={2}>
            Don't have an account ?{" "}
            <Link style={{ color: "#b536cb " }} to="/register">
              Please Register
            </Link>
          </Typography>
        </form>
      </Box>
    </div>
  );
};

export default Login;
