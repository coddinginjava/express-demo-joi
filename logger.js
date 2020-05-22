const logger = (req, res, next) => {
  console.log("logging... middleware 1.1 from separate file");
  next();
};

module.exports = logger;
