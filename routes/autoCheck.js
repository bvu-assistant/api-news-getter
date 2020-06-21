const express = require('express');
const AutoChecker = require('../self_modules/AutoChecker');
const router = express.Router();
module.exports = router;


router.post('/', async(req, res) => {
    
    res.status(200).send('Ok');
    console.log('\nAutoCheck is Calling from CronJob...');
    await AutoChecker.DoAutoCheckEntireHeadlinesPages();
    await AutoChecker.DoAutoCheckEntireStudentPages();
    
});

