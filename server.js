// Importing required modules
const express = require('express');
const cors = require('cors');

// parse env variables
require('dotenv').config();

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Configure middlewares
app.use(cors());

app.set('view engine', 'html');

// Static folder
app.use(express.static(__dirname + '/views/'));

// Defining route middleware
app.use('/api', require('./routes/api'));


module.exports = app;
