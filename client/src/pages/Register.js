import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Helmet } from "react-helmet";
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

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  //media
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  // states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState("");

  //register ctrl
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/register`, {
        username,
        email,
        answer,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        setInterval(() => {
          navigate("/login");
        }, 200);
      } else {
        toast.success(res.data.message);
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
        <title>SearchAI - SignUp</title>
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
          <Typography variant="h3">Sign Up</Typography>
          <TextField
            style={{ background: "white" }}
            label="username"
            required
            margin="normal"
            fullWidth
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
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
            label="your secret key for password reset"
            type="password"
            required
            margin="normal"
            fullWidth
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
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
            Sign Up
          </Button>
          <Typography mt={2}>
            Already have an account ?{" "}
            <Link style={{ color: "#b536cb " }} to="/login">
              Please Login
            </Link>
          </Typography>
        </form>
      </Box>
    </div>
  );
};

export default Register;
