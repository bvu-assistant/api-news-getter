const newsHandler = require('../self_modules/news-handler');
const express = require('express');
const router = express.Router();
module.exports = router;



router.get('/page/:pageIndex', async(req, res) => {
    const pageIndex = req.params.pageIndex;

    if (pageIndex) {
        res.status(200).send(await newsHandler.scrapStudentNews(pageIndex));
        return;
    }

    res.status(200).send('Unknown');
});


router.get('/totalPageCount', async(req, res) => {
    res.status(200).send('Pending');
});