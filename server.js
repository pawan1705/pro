import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import path from "path";
const app = express();

dotenv.config();

const _dirname = path.resolve();
connectDB();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1/auth", authRoutes);

const port = process.env.PORT || 8080;

app.use(express.static(path.join(_dirname, "/client/dist")));
app.get("*"),
  (_, res) => {
    res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
  };
app.listen(port, () => {
  console.log(`Server Running on ${port}`.bgWhite.green);
});
