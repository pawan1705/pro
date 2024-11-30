import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    answer: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);
const UserSchemaModel = mongoose.model("users", userSchema);

export default UserSchemaModel;
