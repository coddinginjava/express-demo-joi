const express = require("express");
const Joi = require("joi");

const app = express();
app.use(express.json());

const courses = [
  { id: 1, name: "courses1" },
  { id: 2, name: "courses2" },
  { id: 3, name: "courses3" },
  { id: 4, name: "courses4" },
];

app.get("/", (req, res) => {
  res.send("hellow wrold");
});

app.get("/api", (req, res) => {
  res.send("api cust");
});

app.get("/api/course/getall", (req, res) => {
  res.send(courses);
});

app.get("/api/course/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("not found");
  res.send(course);
});

app.post("/api/course", (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  const result = Joi.validate(req.body, schema);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.get("/api/:year/:month", (req, res) => {
  //   res.send(req.params);
  res.send(req.query);
});

const port = process.env.PORT || 80;
app.listen(port, () => console.log(`listsneining on ${port}`));
