const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const dbName = 'TestDB'
const dbUrl = `mongodb+srv://rohit10231:rohitkaranpujari@cluster0.kjynvxt.mongodb.net/${dbName}`
const client = new MongoClient(dbUrl)
// await client.connect()
// const db = client.db(dbName)

module.exports = { client, dbName }