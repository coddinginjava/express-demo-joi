const express = require("express");
const logger = require("./logger");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const courses = require("./courses");

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

app.use("/api/course", courses);

console.log("application name " + config.get("name"));
console.log("mail server name " + config.get("mail.host"));
//set NODE_ENV=developemt  // then depvelopment.json will take vicevesa for pord in wndows its not wokring for linux its export

const port = process.env.PORT || 80;
app.listen(port, () => console.log(`listsneining on ${port}`));
