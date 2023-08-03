const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const path = require("path");
// const mongoose =require('mongoose')

var fs = require("fs");

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({
//   extended: false
// }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// parse application/json
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use('/files',express.static('files'))


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "*");
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});
const indexRouter = require("./api/routes/index");
const lessonsRouter = require("./api/routes/lessons");
const GameTestingRouter = require("./api/routes/games/GameTestingRouter");

app.use("/api/", indexRouter);
app.use("/api/lessons", lessonsRouter);
app.use("/api/game/testing", GameTestingRouter);

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  return next(createError(404, 'File not found'));
});



// error handler
app.use(function (err, req, res, next) {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});

module.exports = app;
