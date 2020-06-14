require('dotenv/config');
const express = require('express');
const app = express();



app.listen(process.env.PORT, function () {
    console.log('\n\n"BVU News Getter" server listening on Port:', process.env.PORT);
});