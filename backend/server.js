const express = require('express');
const app = express();
const morgan = require('morgan');
const { readdirSync } = require('fs');
const cors = require('cors');
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

readdirSync('./routes').map((item) =>
  app.use('/api', require('./routes/' + item))
);

app.listen(5000, () => console.log('server running http://localhost:5000/'));
