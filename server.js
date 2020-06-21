require('dotenv/config');

const bodyParser = require('body-parser');
const logger = require('morgan');
const express = require('express');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const mainRoutes = require('./routes/main');
const studentRoutes = require('./routes/student');
const autoCheckRoutes = require('./routes/autoCheck');
app.use('/main', mainRoutes);
app.use('/student', studentRoutes);
app.use('/autoCheck', autoCheckRoutes);



app.listen(process.env.PORT, async function () {
    console.log('"BVU News Getter" server listening on Port:', process.env.PORT);


    // const fsHandler = require('./self_modules/firestore_handler');
    // console.log(Array.from(await fsHandler.getNewsDocuments()).length);
});


app.get('/', function (req, res) {
    res.status(200).send('News Getter server running Oke.');
});
