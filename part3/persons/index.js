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

app.get("/api/persons", (request, response) => {
  PhoneBook.find({}).then((pb) => response.json(pb));
});

app.get("/api/persons/:id", (request, response, next) => {
  PhoneBook.findById(request.params.id)
    .then((pb) => {
      if (pb) {
        response.json(pb);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  PhoneBook.findByIdAndDelete(request.params.id)
    .then((res) => {
      response.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
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

app.put("/api/persons/:id", (request, response, next) => {
  const data = request.body;
  const phoneBook = {
    name: data.name,
    number: data.number,
  };
  PhoneBook.findByIdAndUpdate(request.params.id, phoneBook, { new: true })
    .then((updatedPhoneBoook) => {
      response.json(updatedPhoneBoook);
    })
    .catch((error) => {
      next(error);
    });
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

const errorHandler = (error, request, response, next) => {
  console.log(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
