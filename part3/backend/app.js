/**
 * fly auth login 本地关联
 * fly launch 初始化一个app
 * fly deploy 有代码更新重新发布
 * fly open 打开页面
 * fly secrets set MONGODB_URI='xxxx' 设置环境变量
 */

const config = require("./utils/config");
const notesRouter = require("./controllers/notes");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connecting to MongoDB");
  })
  .catch((err) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

app.use(
  morgan(function (tokens, req, res) {
    let postData;
    if (req.method === "POST") {
      postData = req.body;
    }
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(postData),
    ].join(" ");
  })
);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: err.message });
  }

  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);
