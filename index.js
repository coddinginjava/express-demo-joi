const express = require("express");
const Joi = require("joi");
const logger = require("./logger");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");

const app = express();
app.use(express.json());

//use of middle ware  //custom middleware

// app.use((req, res, next) => {
//   console.log("logging... middleware 1");
//   next();
// });

app.use(logger);

// app.use((req, res, next) => {
//   console.log("authenticating... middleware 2");
//   next();
// });

app.use(express.urlencoded({ extended: true })); // for form login

app.use(express.static("public"));
//http://localhost/readme.txt  no public in url

app.use(helmet());
app.use(morgan("tiny"));

console.log("application name " + config.get("name"));
console.log("mail server name " + config.get("mail.host"));
//set NODE_ENV=developemt  // then depvelopment.json will take vicevesa for pord in wndows its not wokring for linux its export

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
