const ServerError = require('../utils/ServerError.js')
const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan')
// Convenience Error handler, converted ServerError into a json for Error payload
const handleError = (error, req, res, next) => {
  if (!error) {
    next();
  } else if (error instanceof ServerError) {
    console.error(error)
    res.status(error.code).json(error.toResJson());
  } else {
    next(error);
  }
}
module.exports = () => {
  const app = express();
  // setup app
  app.use(bodyParser.json())
  app.use(morgan('dev'));

  // load routes
  app.use(require('../routes'));
  // add error handler
  app.use(handleError)

  return app;
}
