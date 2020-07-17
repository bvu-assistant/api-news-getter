const scrapper = require('./scrapper');
const fsHandler = require('./firebase/firestore_handler');


class AutoChecker {

    static async DoAutoCheckLastPage() {
        console.log('\n\nAutoChecking last page in running...');
        let menuIds = Object.values(scrapper.MenuId);


        for (let i = 0; i < menuIds.length; i++) {
            let articles = await new scrapper.Scrapper(menuIds[i], 1).scrap();
            console.log(await fsHandler.addNews('news/details/' + articles.title, articles.items));
        }


        console.log('AutoCheking last page completed.');
    }


    static async DoAutoCheckAll() {
        console.log('\n\nAutoChecking all pages in running...');
        let menuIds = Object.values(scrapper.MenuId);
        let len = menuIds.length;


        for (let i = 0; i < len; i++) {
            let currPageIndex = 0;
            let hasNextPage = false;

            do {
                ++currPageIndex;
                console.log('\n\nPage:', currPageIndex);
                
                let articles = await new scrapper.Scrapper(menuIds[i], currPageIndex).scrap();
                
                hasNextPage = articles.pagination.next !== null;
                console.log(await fsHandler.addNews('news/details/' + articles.title, articles.items));
            }
            while (hasNextPage);
        }

        console.log('AutoCheking all pages completed.');
    }
}

module.exports = AutoChecker;



// (async function() {
//     AutoChecker.DoAutoCheckAll();
// })();