const express = require('express');
//const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

 
const foodRouter = require('./routes/foods');
const cors = require('cors')

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
 
 
app.use('/api/foods',foodRouter);

module.exports = app;
