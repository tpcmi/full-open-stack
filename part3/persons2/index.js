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

app.get("/info", async (req, res) => {
  const time = new Date().toString();
  let content = `<p>${time}</p>`;
  await Person.find({}).then((persons) => {
    content += `<p>Phonebook has info for ${persons.length} people</p>`;
  });
  res.send(content);
});

app.get("/api/persons/:id?", (req, res) => {
  Person.find({ _id: req.params.id }).then((idRes) => {
    if (idRes.length === 0) {
      res.send("not exist!");
    } else {
      res.json(idRes);
    }
  });
});

app.delete("/api/persons/:id", (req, res) => {
  Person.findByIdAndDelete(req.params.id).then(() => res.status(204).end());
});

app.post("/api/persons", async (req, res) => {
  const [name, number] = req.body;
  if (!name || !number) {
    res.status(400).json({ error: "name and number are required" });
    return;
  } else if (await Person.find({ name: name })) {
    res.status(409).json({ error: "name must be unique" });
    return;
  }

  const newPerson = new Person({
    name: name,
    number: number,
  });
  Person.save(newPerson).then((savedPerson) => {
    res.json(savedPerson);
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
