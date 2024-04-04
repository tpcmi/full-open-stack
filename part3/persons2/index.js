require("dotenv").config();
const Person = require("./models/person");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(express.static("dist"));
app.use(cors());
app.use(express.json());

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/info", async (req, res, next) => {
  const time = new Date().toString();
  let content = `<p>${time}</p>`;
  await Person.find({})
    .then((persons) => {
      content += `<p>Phonebook has info for ${persons.length} people</p>`;
    })
    .catch((err) => {
      next(err);
    });
  res.send(content);
});

app.get("/api/persons/:id?", (req, res, next) => {
  try {
    let id = req.params.id;
    if (id) {
      Person.find({ _id: id })
        .then((idRes) => {
          if (idRes.length === 0) {
            res.send("not exist!");
          } else {
            res.json(idRes);
          }
        })
        .catch((err) => {
          next(err);
        });
    } else {
      Person.find({})
        .then((allData) => {
          res.json(allData);
        })
        .catch((err) => {
          next(err);
        });
    }
  } catch (err) {
    next(err);
  }
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((response) => {
      res.status(204).end();
    })
    .catch((err) => {
      next(err);
    });
});

app.post("/api/persons", async (req, res, next) => {
  const { name, number } = req.body;
  if (!name || !number) {
    res.status(400).json({ error: "name and number are required" });
    return;
  } else if ((await Person.find({ name: name })).length > 0) {
    res.status(409).json({ error: "name must be unique" });
    // 虽然上一行代码已经返回给客户端，但是为了避免代码继续向下执行，此处直接返回
    return;
  }

  const newPerson = new Person({
    name: name,
    number: number,
  });
  newPerson
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((err) => {
      next(err);
    });
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number }  = req.body;
  const id = req.params.id;
  if (!name || !number || !id) {
    return res.status(400).send({ error: "name and number and id are required" })
  }
  Person.findByIdAndUpdate(id, { name: name, number: number }, {new:true}).then(updatedData => {
    return res.json(updatedData)
  }).catch(err => {
    next(err)
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (err.name === "MongooseError") {
    return res.status(500).send("network error");
  }else if (err.name === "ValidationError") {
    return res.status(400).send({error:err.message});
  }
  next(err);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
