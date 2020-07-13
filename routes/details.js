
const newsDetailHandler = require('../self_modules/news-detail-handler');
const router = require('express').Router();
module.exports = router;


router.get('/:articleId', async(req, res) => {

    const articleId = req.params.articleId || "null";
    res.status(200).send(await newsDetailHandler.getDetails(articleId));

});