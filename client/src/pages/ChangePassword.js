import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
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
const ChangePassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  //media
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  // states
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [error] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/forgot-password`, {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setInterval(() => {
          navigate("/login");
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
        <Typography variant="h3">Reset Password</Typography>

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
          label="Secret Key "
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
          label="enter new password"
          type="password"
          required
          margin="normal"
          fullWidth
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ color: "white", mt: 2 }}
        >
          Reset Password
        </Button>

        <Typography mt={2}>
          Don't have an account ?{" "}
          <Link style={{ color: "#b536cb " }} to="/register">
            Please Register
          </Link>
        </Typography>
      </form>
    </Box>
  );
};

export default ChangePassword;
