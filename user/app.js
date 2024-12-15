const express = require('express');
const { UserRoutes } = require('./routes');
const dotenv  = require('dotenv');
const cookieParser = require('cookie-parser');
const connectToMongoDB = require('./db/db').connectToMongoDB;
const bodyParser = require('body-parser');
dotenv.config();
const app = express();
connectToMongoDB();
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// User Routes
app.use('/' ,UserRoutes)


module.exports = app