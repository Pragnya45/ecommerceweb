import { config } from "dotenv";
import { connect } from "mongoose";
import express from "express";
const app = express();
import { json } from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
config();
//My routes
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import categoryRoutes from "./routes/category";
import productRoutes from "./routes/product";
import orderRoutes from "./routes/order";
import paymentBRoutes from "./routes/paymentBRoutes";

//DB Connections
connect(process.env.DATABASE).then(() => {
  console.log("DB CONNECTED");
});

//Middlewares
app.use(json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes); ///middileware to handel it
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentBRoutes);

//PORT
const port = process.env.PORT || 8000;

app.get("/", (req, res) => res.send("Backend Server Running Successfully"));

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
