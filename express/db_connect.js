'use strict';

const MongoClient = require('mongodb').MongoClient;


const url = 'mongodb://127.0.0.1:27017/';
const client = new MongoClient(url);

const connectToMongo = async () => {
    console.log("express - in connect to mongo");
	try {
		// Use connect method to     connect to the Server
		await client.connect();

		const db = await client.db('local');
        const cursor = await db.collection("metadata").find({id: 1}, {title: 1, id: 0, _id: 0});

        await cursor.forEach(console.log);

		// Perform further operations on the database here

	} catch (err) {
		console.log(err);
	} finally {
		await client.close();
	}
}

module.exports = {
    connectToMongo,
  };
  