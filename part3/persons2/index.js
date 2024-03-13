const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(cors())
app.use(express.json());

morgan.token("body", (req) => JSON.stringify(req.body))
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

let person = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (req, res) => {
  const time = new Date().toString();
  const content = `<p>Phonebook has info for ${person.length} people</p>
  <p>${time}</p>`;
  res.send(content);
});

app.get("/api/persons/:id?", (req, res) => {
  const id = Number(req.params.id);
  const specificPerson = person.find((p) => p.id === id);
  if (specificPerson) {
    res.json(specificPerson);
  } else {
    res.json(person);
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);

  person = person.filter((p) => p.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    res.status(400).json({ error: "name and number are required" });
    return;
  } else if (person.some((p) => p.name === name)) {
    res.status(409).json({ error: "name must be unique" });
    return;
  }

  // if(number)
  const newPerson = {
    name: req.body.name,
    number: req.body.number,
    // 先构建id的list，然后再解构
    id: person.length === 0 ? 1 : Math.max(...person.map((p) => p.id)) + 1,
  };
  person.push(newPerson);
  res.json(person);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
