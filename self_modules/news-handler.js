module.exports = { scrapHeadlines, scrapStudentNews }

const request = require('request');
const cheerio = require('cheerio');



//  Tin chính
async function scrapHeadlines(pageIndex)
{
    try
    {
        // console.log('\nGetting headlines...');
        
        return new Promise((resolve, reject) =>
        {
            request({
                method: 'GET',
                strictSSL: false,
                url: 'https://sinhvien.bvu.edu.vn/News.aspx',
                qs: {
                    MenuID: 371,
                    CurrentPage: pageIndex
                }
            },
            async(err, res, body) =>
            {
                if (err || (res.statusCode !== 200))
                {
                    return reject(err || body);
                }


				let items = [];
                let $ = cheerio.load(body, {decodeEntities: false});
                items.push(await getPagingInfo(body));


				$('#main_container .col-left .mod').each((index, elem) =>
				{
					let headline = $(elem).find('.head >h3:contains("Trang Chủ")');
					if (headline !== null && headline.text() !== "")
					{
						$(elem).find('.item').each((index, elem) =>
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
				});


				// console.log(items);
				return resolve(items);
            });
        });
    }
    catch(err)
    {
        console.log(err);
    }
}


//  Tin sinh viên
async function scrapStudentNews(pageIndex)
{
    try
    {
        return new Promise((resolve, reject) =>
        {
            request({
                method: 'GET',
                strictSSL: false,
                url: 'https://sinhvien.bvu.edu.vn/News.aspx',
                qs: {
                    MenuID: 351,
                    CurrentPage: pageIndex
                }
            },
            async(err, res, body) =>
            {
                if (err || (res.statusCode !== 200))
                {
                    return reject(err || body);
                }


				let items = [];
                let $ = cheerio.load(body, {decodeEntities: false});
                items.push(await getPagingInfo(body));
                

				$('#main_container .col-left .mod').each((index, elem) =>
				{
					let headline = $(elem).find('.head >h3:contains("Tin tức Sinh viên - Học viên")');
					if (headline !== null && headline.text() !== "")
					{
						$(elem).find('.item').each((index, elem) =>
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
				});


				// console.log(items);
				return resolve(items);
            });
        });
    }
    catch(err)
    {
        console.log(err);
    }
}


async function getPagingInfo(body) {

    return new Promise((resolve, reject) => {
        let $ = cheerio.load(body, {decodeEntities: false});

        let previous = $('#pagination-flickr >li.previous >a').attr('href');
        let next = $('#pagination-flickr >li.next >a').attr('href');
        let active = $('#pagination-flickr >li.active').html();

        return resolve({
            previous: previous || null,
            active: active || null,
            next: next || null
        });
    });

}



// (async () => {
//     var news = await scrapHeadlines(8);
//     console.log(news);
// })();