module.exports = { getDetails }

const request = require('request');
const cheerio = require('cheerio');



async function getDetails(articleId) {
    try {
        return new Promise((resolve, reject) => {
            request({
                method: 'GET',
                strictSSL: false,
                url: 'https://sinhvien.bvu.edu.vn/NewsDetail.aspx',
                qs: {
                    NewsID: articleId
                }
            },
            (err, res, body) => {

                if (err || res.statusCode !== 200)
                    return resolve(null);

                return resolve(getDetailLinks(body));
            });
        });
    }
    catch (err) {
        console.log('Error when getting details of the link:', articleUrl);
        return null;
    }
}



async function getDetailLinks(body) {
    let result = {
        fullMessage: '',
        links: []
    };


    let $ = cheerio.load(body, {decodeEntities: false});
    let div = $('#ctl00_ContentPlaceHolder_ContentID').html();


    if (div == 'Không tìm thấy thông tin.') {
        return div;
    }
    else {
        result.fullMessage = $(div).text();
        
        $(div).find('a').each((index, elem) => {
            let fileUrl = $(elem).attr('href');
            let fileDescription = $(elem).text();
            
            let obj = {};
            obj[fileDescription] = fileUrl;

            result.links.push(obj);
        });
    }
    

    return result;
}