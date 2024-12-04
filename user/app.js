const express = require('express');
const { UserRoutes } = require('./routes');
const dotenv  = require('dotenv');
const cookieParser = require('cookie-parser');
const connectToMongoDB = require('./db/db').connectToMongoDB;

dotenv.config();
const app = express();
connectToMongoDB();
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(cookieParser());


// User Routes
app.use('/' ,UserRoutes)


module.exports = app