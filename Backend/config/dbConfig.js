const mongodb = require('mongodb')
const MongoClient=mongodb.MongoClient
const dbName='TestDB'
const dbUrl=`mongodb+srv://rohit10231:rohitkaranpujari@cluster0.kjynvxt.mongodb.net/${dbName}`
// `mongodb+srv://rohit10231:rohitkaranpujari@cluster0.kjynvxt.mongodb.net/${dbName}`

module.exports={mongodb, MongoClient, dbName, dbUrl}