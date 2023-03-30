console.log("iShop E-Commerce Backend");

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import menuApi from "./routes/menu-api";
import adminApi from "./routes/admin-api";
import dotenv from "dotenv";
import authRouter from "./routes/auth-api";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
app.use(cors());
app.use(express.json());
app.use("/menu", menuApi);
app.use("/admin", adminApi);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  mongoose
    .connect(MONGO_CONNECTION_STRING)
    .then(console.log("Database successfully connected"))
    .catch((error) => console.error(error));

  console.log(`E-Commerce application is running on http://localhost:${PORT}`);
});
