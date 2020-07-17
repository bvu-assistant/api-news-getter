require('dotenv/config');

const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const getRoutes = require('./routes/get');
const detailsRoutes = require('./routes/details');
const autoCheckRoutes = require('./routes/autoCheck');
app.use('/get',getRoutes);
app.use('/details', detailsRoutes);
app.use('/autoCheck', autoCheckRoutes);



app.listen(process.env.PORT, async function () {
    console.log('"BVU News Getter" server listening on Port:', process.env.PORT);
    console.log('Open the Browser on:', `http://localhost:${process.env.PORT}\n\n`);
});


app.get('/', function (req, res) {
    res.status(200).send('News Getter server running Oke.');
});
