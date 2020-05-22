const express = require("express");
const router = express.Router();
const Joi = require("joi");

const courses = [
  { id: 1, name: "courses1" },
  { id: 2, name: "courses2" },
  { id: 3, name: "courses3" },
  { id: 4, name: "courses4" },
];

router.get("/", (req, res) => {
  res.send("hellow wrold");
});

router.get("/getall", (req, res) => {
  res.send(courses);
});

router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("not found");
  res.send(course);
});

router.post("/", (req, res) => {
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

router.get("/:year/:month", (req, res) => {
  //   res.send(req.params);
  res.send(req.query);
});

module.exports = router;
