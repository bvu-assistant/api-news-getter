const AutoChecker = require('../self_modules/AutoChecker');
const fsHandler = require('../self_modules/firestore_handler');
const express = require('express');
const router = express.Router();
module.exports = router;


router.post('/', async(req, res) => {
    
    res.status(200).send('Ok');
    console.log('\nAutoCheck is Calling from CronJob...');

    // await fsHandler.addSampleArticle();
    await AutoChecker.DoAutoCheckLastPage();
    // await AutoChecker.DoAutoCheckEntireHeadlinesPages();
    // await AutoChecker.DoAutoCheckEntireStudentPages();
    
});

