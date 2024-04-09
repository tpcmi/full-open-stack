const config = require("./utils/config");
const blogRouter = require("./controllers/blogs");
const logger = require("./utils/logger")
const middleware = require("./utils/middleware")
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const app = express();


mongoose.set("strictQuery", false);
mongoose.connect(config.MONGODB_URL).then(() => {
  logger.info("connecting to", config.MONGODB_URL)
}).catch((err) => {
  logger.error("error connecting to MongoDB:", err.message)
});

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger)
app.use("/api/blogs", blogRouter);
module.exports = app
