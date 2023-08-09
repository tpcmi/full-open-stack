require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const PhoneBook = require("./models/phoneBook");
app.use(cors());
app.use(express.json());
app.use(express.static("build"));

// 终端打印每次请求
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

// let persons = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

app.get("/api/persons", (request, response) => {
  PhoneBook.find({}).then((pb) => response.json(pb));
});

app.get("/api/persons/:id", (request, response) => {
  PhoneBook.findById(request.params.id)
    .then((pb) => {
      if (pb) {
        response.json(pb);
      } else {
        response.status(404).end();
      }
    })
    .catch((err) => {
      console.log(err);
      response.status(500).end();
    });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  console.log("id:", id);
  PhoneBook.findByIdAndDelete(id).then((res) => {
    console.log("deleted:", res);
  });
  response.status(204).end();
});

// const generateId = () => {
//   const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
//   return maxId + 1;
// };
app.post("/api/persons", (request, response) => {
  const data = request.body;

  if (data.name && data.number) {
    // const hasAdded = persons.find((p) => p.name === data.name);
    // if (hasAdded) {
    //   return response.status(400).json({ error: "name must be unique" });
    // }
    const phoneBook = PhoneBook({
      name: data.name,
      number: data.number,
    });
    phoneBook.save().then((result) => response.json(result));
  } else {
    response.status(400).json({ error: "name or number are required" });
  }
});

app.get("/info", (request, response) => {
  PhoneBook.find({}).then((pb) => {
    const reqTime = new Date();
    response.send(
      `<p>PhoneBook has info for ${pb.length} people</p><p>${reqTime}</p>`
    );
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
