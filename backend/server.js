import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import birthdayRoutes from "./routes/birthdays.js";
import pushRoutes from "./routes/push.js";
import { startCronJobs } from "./utils/cronJobs.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/birthdays", birthdayRoutes);
app.use("/api/push", pushRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

startCronJobs();