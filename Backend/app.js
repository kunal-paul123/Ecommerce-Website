const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "Backend/config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const __dirname = path.resolve();

//Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoutes");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

//Serving static files
app.use(express.static(path.join(__dirname, "../Frontend/dist")));
app.get(
  "*",
  (_,
  (res) => {
    res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
  })
);

app.get("/api/v1/getkey", (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
});

//Middleware for error
app.use(errorMiddleware);

module.exports = app;
