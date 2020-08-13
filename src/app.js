const express = require('express');
const helmet = require('helmet');
const compress = require('compression');
const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config();

const api = require('./routes');
const middlewares = require('./middlewares');

const app = express();

app.use(helmet());
app.use(cors({
  origin: '*'
}));
app.use(compress());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;