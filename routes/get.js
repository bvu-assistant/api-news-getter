const scrapper = require('../self_modules/scrapper');
const express = require('express');
const router = express.Router();
module.exports = router;




router.get('/:menuId/:pageIndex', async(req, res) => {
    const menuId = req.params.menuId;
    const pageIndex = req.params.pageIndex;


    let isMenuIdExists = Object.values(scrapper.MenuId).indexOf(parseInt(menuId)) !== -1;
    

    if (isMenuIdExists) {
        res.status(200).send(await new scrapper.Scrapper(menuId, pageIndex).scrap());
        return;
    }

    res.status(404).send('Menu Id not found');
});


router.get('/totalPageCount', async(req, res) => {
    res.status(200).send('Pending');
});