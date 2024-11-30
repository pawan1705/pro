import USM from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/authUtils.js";
import JWT from "jsonwebtoken";

export const userRegister = async (req, res) => {
  try {
    const { username, email, password, answer } = req.body;
    if (!username) {
      return res.send({ message: "UserName is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is required" });
    }

    const existingUser = await USM.findOne({ email });
    //existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered Please Login",
      });
    }
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new USM({
      username,
      email,
      password: hashedPassword,
      answer,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    const user = await USM.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//forgot password
export const forgotPassword = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "newPassword is required" });
    }
    const user = await USM.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Something Went Wrong",
      });
    }
    const hashed = await hashPassword(newPassword);
    await USM.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something Went Wrong",
      error,
    });
  }
};
