import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI!;

async function connectDB() {
  await mongoose.connect(MONGO_URI);
}
connectDB().catch((err) => console.log(err));

export default connectDB;
