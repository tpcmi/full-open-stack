const express = require("express");
const morgan = require("morgan")
const app = express();
app.use(express.json());

app.use(morgan(function (tokens, req, res) {
  let postData 
  if (req.method === "POST") {
    postData = req.body
  }
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms', JSON.stringify(postData)
  ].join(' ')
}))

let persons = [
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

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const data = persons.find((p) => p.id === id);
  if (data) {
    return response.json(data);
  }
  response.status(400).json({ error: "not exist" });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);
  response.status(204).end();
});

const generateId = () => {
  const maxId = persons.length>0?Math.max(...persons.map((p) => p.id)):0;
  return maxId + 1;
};
app.post("/api/persons", (request, response) => {
  const data = request.body;

  if (data.name && data.number) {
    const hasAdded = persons.find(p => p.name === data.name)
    if (hasAdded) {
      return response.status(400).json({error:"name must be unique"})
    }
    const newData = {
      name: data.name,
      number: data.number,
      id: generateId(),
    };
    persons = persons.concat(newData);
    return response.json(newData);
  }
  response.status(400).json({ error: "name or number are required" });
});

app.get("/info", (reqest, response) => {
  const localDataNum = persons.length;
  const reqTime = new Date();
  response.send(
    `<p>PhoneBook has info for ${localDataNum} people</p><p>${reqTime}</p>`
  );
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
