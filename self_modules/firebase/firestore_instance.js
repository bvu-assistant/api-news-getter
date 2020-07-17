class FireStore {
    
    constructor() {
        const admin = require('firebase-admin');
        let serviceAccount = require('./firebase_sdk_key.json');

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });

        console.log('\n\nA new FireStore instance just created.');
        this.db = admin.firestore();
    }
}


module.exports = new FireStore();