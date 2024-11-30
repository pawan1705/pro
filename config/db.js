import mongoose from "mongoose";
import colors from "colors";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(
      `Connected to mongodb database ${conn.connection.host}`.bgBlue.white
    );
  } catch (error) {
    console.log(`Error in mongodb connection ${error}`.bgWhite.red);
  }
};

export default connectDB;
