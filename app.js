const express = require("express");
const cors = require("cors");
const productsRoutes = require("./api/products/routes");
const connectDB = require("./database");

const app = express();
app.use(cors());
const path = require("path");

//middleWare

app.use(express.json());
app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
});

// Routes
app.use("/api/products", productsRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));
console.log("path");

//Error Handling Middle
app.use((err, req, res, next) => {
  return res
    .status(err.status || 500)
    .json({ message: err.message || "Server Error" });
});

//Path not found
app.use((req, res, next) => {
  res.status(404).json("path not found");
}),
  connectDB();

app.listen(process.env.PORT || 5001);
