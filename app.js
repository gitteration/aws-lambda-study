var express = require('express');
var path = require('path');

var uploadRoute = require('./routes/upload');
var usersRouter = require('./routes/users');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/upload', uploadRoute);
app.use('/users', usersRouter);

module.exports = app;
