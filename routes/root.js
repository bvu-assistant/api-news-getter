const express = require('express');
const router = express.Router();
module.exports = router;


router.get('/main', (req, res) => {
    res.status(200).send('Oke');
});


router.get('/student', (req, res) => {

});