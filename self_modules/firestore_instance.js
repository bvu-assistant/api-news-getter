class FireStore {
    
    constructor() {
        const admin = require('firebase-admin');
        let serviceAccount = require('./bvuassistant-1585757109800-firebase-adminsdk-i7b3z-d4e46e1296.json');

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });

        console.log('\n\nA new FireStore instance just created.');
        this.db = admin.firestore();
    }
}


module.exports = new FireStore();