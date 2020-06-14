const express = require('express');
const router = express.Router();


router.get('/main', (req, res) => {
    res.status(200).send('Oke');
});


router.get('/student', (req, res) => {

});