/**
 * fly auth login 本地关联
 * fly launch 初始化一个app
 * fly deploy 有代码更新重新发布
 * fly open 打开页面
 * fly secrets set MONGODB_URI='xxxx' 设置环境变量
 */

const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const Note = require("./models/note");

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

// 探活
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

// 获得所有笔记
app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => response.json(notes));
});

// 获取指定笔记
app.get("/api/notes/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// 删除指定笔记
app.delete("/api/notes/:id", (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// 新增笔记
app.post("/api/notes", (request, response, next) => {
  const body = request.body;
  /** 在schema处增加表单验证，此处就不再验证 */
  // if (!body.content) {
  //   return response.status(400).json({ error: "content missing" });
  // }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note
    .save()
    .then((savedNote) => response.json(savedNote))
    .catch((error) => next(error));
});

// 修改笔记数据
app.put("/api/notes/:id", (request, response, next) => {
  const { content, important } = request.body;

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators:true, context:'query' }
  )
    .then((updateNote) => {
      response.json(updateNote);
    })
    .catch((error) => {
      next(error);
    });
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);