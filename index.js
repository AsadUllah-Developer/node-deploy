const dontenv = require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { type } = require("os");
const { request } = require("http");
const { create } = require("domain");
const server = express();
const path = require("path");

const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
console.log("env", process.env.DB_PASSWORD);

//db connection

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("database connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//schema

//Body Parser
server.use(express.json());
server.use(express.urlencoded());
server.use(morgan("default"));
server.use(express.static(process.env.PUBLIC_DIR));
server.use("/products", productRouter.router);
server.use("/users ", userRouter.router);
server.use("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});
// Model-View-Controller

server.listen(process.env.PORT, () => {
  console.log("server started");
});
