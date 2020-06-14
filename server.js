require('dotenv/config');

const bodyParser = require('body-parser');
const logger = require('morgan');
const express = require('express');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const rootRoutes = require('./routes/root');
app.use('/', rootRoutes);



app.listen(process.env.PORT, function () {
    console.log('\n\n"BVU News Getter" server listening on Port:', process.env.PORT);
});

