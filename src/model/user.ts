import mongoose from "mongoose";

const schema = mongoose.Schema;

const registerSchema = new schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
});

export const registerDetails = mongoose.model("user", registerSchema, "user");