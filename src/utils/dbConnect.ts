import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env",
  );
}

const MONGODB_URI = process.env.MONGODB_URI;
let connection: typeof mongoose;

const dbConnect = async () => {
  if (connection) return connection;
  try {
    connection = await mongoose.connect(MONGODB_URI);
    return connection;
  } catch (error) {
    throw error;
  }
};

export default dbConnect;
