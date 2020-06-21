const newsHandler = require('./news-handler');
const fsHandler = require('./firestore_handler');


class AutoChecker {

    static async DoAutoCheckLastPage() {
        let headlines = await newsHandler.scrapHeadlines(1);
        let studentNews = await newsHandler.scrapStudentNews(1);

        console.log(await fsHandler.addNews('news/details/headlines', headlines));
        console.log(await fsHandler.addNews('news/details/student', studentNews));
    }


    static async DoAutoCheckEntireHeadlinesPages() {
        
        let isLastPage = false;
        let articles = [];
        let currPageIndex = 0;
        console.log('\n\nAuto checking entire the Headlines pages...');
        

        do {
            ++currPageIndex;
            articles = await newsHandler.scrapHeadlines(currPageIndex);

            let paging = articles.splice(0, 1)[0];
            console.log('\n\nPage:', currPageIndex);
            console.log(await fsHandler.addNews('news/details/headlines', articles));
            
            
            if (paging.next === null) {
                isLastPage = true;
            }
        }
        while (!isLastPage);
    }

    static async DoAutoCheckEntireStudentPages() {
        
        let isLastPage = false;
        let articles = [];
        let currPageIndex = 0;
        console.log('\n\nAuto checking entire the StudentNews pages...');
        

        do {
            ++currPageIndex;
            articles = await newsHandler.scrapStudentNews(currPageIndex);

            let paging = articles.splice(0, 1)[0];
            console.log('\n\nPage:', currPageIndex);
            console.log(await fsHandler.addNews('news/details/student', articles));
            
            
            if (paging.next === null) {
                isLastPage = true;
            }
        }
        while (!isLastPage);
    }
}

module.exports = AutoChecker;