import { logger } from "@middleware/logger";
import mongoose from "mongoose";
import { ENV } from "../config";

const server = `${ENV.DB_HOST}:${ENV.DB_PORT}`;
const database = "pm";

const options = {
  autoIndex: true,
  autoCreate: true,
};

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://${server}/${database}`, options);

    logger.info("🚀 Connected to MongoDB on port 2017 succesfully");
  } catch (err) {
    logger.error("❌ MongoDB Connection Error: ", err);
  }
};

export default connectDB;
