import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRouter from "./routers/user.route.js";
import companyRouter from "./routers/company.route.js";
import jobRouter from "./routers/job.route.js";
import applicationRouter from "./routers/application.route.js";
const app = express();

dotenv.config({ path: "./.env" });

app.get("/home", (req, res) => {
  return res.status(200).json({ message: "Hello from the server side" });
});

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOtions = { 
  origin: "http://localhost:5173 ", 
  credentials: true 
}
app.use(cors(corsOtions));


const PORT =process.env.PORT|| 3000;

app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on PORT ${PORT}`);
});
