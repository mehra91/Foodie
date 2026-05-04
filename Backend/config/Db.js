import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoUrl);
    console.log("MongoDB Connected ");
  } catch (error) {
    console.log("DB Error ", error);
  }
};

export default connectDB;