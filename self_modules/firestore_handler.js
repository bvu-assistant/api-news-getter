const database = require('./firestore_instance').db;


class FireStoreHandler {

    constructor() {
        this.db = database;
    }


    async getNewsDocuments() {
        return new Promise((resolve, reject) => {
            this.db.collection('news/details/headlines').get().then(snapshot => {
                let response = [];

                snapshot.forEach(doc => {
                    response.push({
                        id: doc.id,
                        fields: doc.data()
                    })
                });
                
                return resolve(response);
            })
            .catch(err => {
                console.log(err);
                return reject(err);
            });
        });
    }


    async addNews(path, articles) {
        return new Promise( async(resolve, reject) => {
            console.log(`Adding ${articles.length} articles to FireStore...`);
            console.log('Path: ' + path, '\n');
            
            
            for (let i = 0; i < articles.length; i++) {
                await this.db.collection(path)
                    .doc(articles[i].Link.split('ID=')[1])
                    .set({
                        Id: parseInt(articles[i].Id),
                        Title: articles[i].Title,
                        Link: articles[i].Link,
                        Date: articles[i].Date,
                        IsNew: articles[i].IsNew,
                    })
                    .then((res) => {
                        console.log(`Finished ${i + 1}/${articles.length} [${articles[i].Link.split('ID=')[1]}].`);
                    })
                    .catch(reason => {
                        console.log('Failed to add articles, reason:', reason, '\n');
                    });
            }

            return resolve('Finish add news.\n\n');
        });
    }


    async addSampleArticle() {
        return new Promise((resolve, reject) => {
            this.db.collection('news/details/headlines')
                .doc('2821')
                .set({
                    Title: 'Title',
                    Link: 'Link',
                    Date: 'Date',
                    IsNew: 'IsNew',
                }).then(res => {
                    console.log('Finished');
                })
                .catch(reason => {
                    console.log(reason);
                });
        });
    }
}


module.exports = new FireStoreHandler();