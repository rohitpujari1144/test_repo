var express = require('express');
var router = express.Router();
const { mongodb, MongoClient, dbName, dbUrl } = require('./../config/dbConfig')

// get all products
router.get('/allProducts', async (req, res) => {
    const client = new MongoClient(dbUrl)
    await client.connect()
    try {
        const db = client.db(dbName)
        const collection = db.collection('All_Products')
        let allProducts = await collection.find().toArray()
        res.status(200).send(allProducts)
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
});

// add product
router.post('/addProduct', async (req, res) => {
    const client = new MongoClient(dbUrl)
    await client.connect()
    try {
        const db = client.db(dbName)
        const collection = db.collection('All_Products')
        const productInfo = await collection.aggregate([{ $sort: { productId: -1 } }]).toArray()
        if (productInfo.length) {
            req.body.productId = productInfo[0].productId + 1
        }
        else {
            req.body.productId = 1
        }
        req.body.price = parseInt(req.body.price)
        await collection.insertOne(req.body)
        res.status(201).send({ message: 'Product successfully added', data: req.body })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

module.exports = router;