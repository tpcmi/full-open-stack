/**
 * fly auth login 本地关联
 * fly launch 初始化一个app
 * fly deploy 有代码更新重新发布
 * fly open 打开页面
 */

const express = require("express");
const app = express();
const cors = require("cors");
const Note = require("./models/note");

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true,
  },
];
// 探活
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

// 获得所有笔记
app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => response.json(notes));
});

// 获取指定笔记
app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  const note = notes.find((note) => note.id.toString() === id);
  if (note) {
    response.json(note);
  } else {
    response.status(400).end();
  }
});

// 删除指定笔记
app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

// 新增笔记
app.post("/api/notes", (request, response) => {
  const body = request.body;

  const maxId =
    notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0;

  if (!body.content) {
    return response.status(400).json({ error: "content missing" });
  }
  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: maxId + 1,
  };

  notes = notes.concat(note);
  response.json(note);
});

// 修改笔记数据
app.put("/api/notes/:id", (request, response) => {
  const body = request.body;
  const id = Number(request.params.id);
  notes = notes.map((note) => (note.id === id ? body : note));
  response.status(200).json(body);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
