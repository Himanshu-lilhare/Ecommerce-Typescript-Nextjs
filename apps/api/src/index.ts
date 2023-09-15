import express from "express";
import { json } from "body-parser";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./config/connectDb.js";
import { CustomErrorHandler } from "./middleware/customerrorHandler.js";
import productRouter from "./routes/product.js";
import adminRouter from "./routes/admin.js";
import userRouter from "./routes/user.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import Razorpay from "razorpay";
import orderRouter from "./routes/order.js";
import cron from "node-cron";
dotenv.config({
  path: "./src/config/.env",
});
const app = express();

app.disable("x-powered-by");

app.use(morgan("dev"));
// app.use(bodyParser)
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3002",
      "https://checkout.razorpay.com",
      "https://*.razorpay.com",
    ],
    credentials: true,
  })
);
// app.use(cors())
app.use(cookieParser());
app.use(productRouter);
app.use(userRouter);
app.use("/admin", adminRouter);
app.use(orderRouter);
app.get("/message/:name", (req, res) => {
  return res.json({ message: `hello ${req.params.name}` });
});

app.use(CustomErrorHandler);
connectDb();
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});
export let instance = new Razorpay({
  key_id: "rzp_test_LWJbzFhEywmrc4",
  key_secret: "Ulw083J2EWSbkEQ748AlfVQ7",
});
app.listen(process.env.PORT, () => {
  console.log(`running at port ${process.env.PORT}`);

  cron.schedule("* * 1 * *", () => {
    let num = 1;
    num++;
    console.log("run hua " + num);
  });
});
