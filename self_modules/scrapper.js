
const request = require('request');
const cheerio = require('cheerio');


/** Menu IDs
 * 
 *  371: headlines
 *  351: student news
 *  346: scholarship
 *  421: student activities
 *  375: after university
 *  
 *  rules:
 *      423: training
 *      424: student work (Công tác sinh viên)
 *      425: guidances
 *      348: forms
 */


const MenuId = {
    Headlines: 371,
    StudentNews: 351,
    
    Scholarship: 346,
    StudentActivities: 421,
    AfterUniversity: 375,

    TrainingRules: 423,
    StudentWordRules: 424,
    Guidances: 425,
    StudentForms: 348,
};


class Scrapper {

    constructor(menuId, pageIndex) {
        this.menuId = menuId;
        this.pageIndex = pageIndex;;
    }



    async scrap() {
        return new Promise((resolve, reject) => {
            request({
                method: 'GET',
                strictSSL: false,
                timeout: 5000,
                url: 'https://sinhvien.bvu.edu.vn/News.aspx',
                qs: {
                    MenuID: this.menuId,
                    CurrentPage: this.pageIndex
                }
            },
            async(err, res, body) =>
            {
                if (err || (res.statusCode !== 200))
                {
                    return reject('Error when fetching Headlines', err);
                }


                let result = {
                    title: await this.getPageTitle(body),
                    pagination: await this.getPagingInfo(body),
                    items: await this.getItems(body)
                };


				// console.log(items);
				return resolve(result);
            });
        });
    }



    async getPageTitle(bodyResponse) {
        let $ = cheerio.load(bodyResponse, {decodeEntities: false});
        let title = '';

        try {
            let theTitle = $('.head > h3').first().text();
            title = theTitle;
        }
        catch (err) {
            console.log();
        }
        finally {
            return title;
        }
    }


    async getItems(bodyResponse) {
        let $ = cheerio.load(bodyResponse, {decodeEntities: false});
        let selector = '#main_container .col-left .mod';
        let items = [];

        try {
            $(selector).first().find('.item').each((index, elem) =>
            {
                let title = $(elem).find('.title >a');
                // console.log('\n\n' + title.text());
                

                let isNew = $(elem).find('.title >img[src="images/new.gif"]').html() !== null;
                // console.log(isNew);


                let href = 'https://sinhvien.bvu.edu.vn/' + title.attr('href');
                // console.log(href);


                let date = $(elem).find('.title >.date');
                // console.log(date.text().split(': ')[1]);


                items.push({
                    Id: href.split('?NewsID=')[1],
                    Title: title.text(),
                    Link: href,
                    IsNew: isNew,
                    Date: date.text().split(': ')[1]
                });
            });
        }
        catch (err) {
            console.log('Error when getting the Article from:', this.menuId);
        }
        finally {
            return items;
        }
    }

    async getPagingInfo(bodyResponse) {

        let stream = await new Promise((resolve, reject) => {
            try {
                let $ = cheerio.load(bodyResponse, {decodeEntities: false});
    
                let previous = $('#pagination-flickr >li.previous >a').attr('href');
                let next = $('#pagination-flickr >li.next >a').attr('href');
                let active = $('#pagination-flickr >li.active').html();
        
                return resolve({
                    previous: previous || null,
                    active: active || null,
                    next: next || null
                });
            }
            catch (err) {
                console.log('Error when get the paging info:', err);
                return reject({
                    previous: null,
                    active: null,
                    next: null
                });
            }
        });


        return stream;
    }
}


module.exports = { Scrapper, MenuId };





// (async function() {

//     let mScrapper = new Scrapper(MenuId.AfterUniversity, 1);
//     mScrapper.scrap()
//         .then(data => {
//             console.log(data);
//         })
//         .catch(err => console.log(err));

// })();