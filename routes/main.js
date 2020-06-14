const newsHandler = require('../self_modules/news-handler');
const express = require('express');
const router = express.Router();
module.exports = router;



router.get('/page/:pageIndex', async(req, res) => {
    const pageIndex = req.params.pageIndex;

    let articleList = await newsHandler.scrapHeadlines(pageIndex);
    console.log(articleList);
    
    res.status(200).send(articleList);
});


router.get('/totalPageCount', async(req, res) => {
    res.status(200).send('Pending');
});