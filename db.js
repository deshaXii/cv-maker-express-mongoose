const Mongoose = require("mongoose");
const app = require('./server')
const connection = Mongoose.connection;

// Configuring port
const port = process.env.PORT || 9000;


const dotenv = require('dotenv').config()


exports.getCollection = ((collectionName) => {
    if (typeof collectionName === 'string') {
        connection.db.collection(collectionName, function(err, collection){
            collection.find({}).toArray(function(err, data){
                console.log('Collection data' + data); // it will print your collection data
            })
        });
    } else {
        console.log('you must enter a collection name as string')
    }
    
})


Mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, function(err, client) {
    app.listen(process.env.PORT)
    // Listening to port
    console.log(`db is conected Listening On http://localhost:${port}/api`);
})
