var express = require('express');
var router = express.Router();
const { client, dbName } = require('./../config/dbConfig')
const { validate } = require('../common/auth')

// get all products
router.get('/', async (req, res) => {
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection('All_Products')
    try {
        let allProducts = await collection.find().toArray()
        if (allProducts.length) {
            res.status(200).send(allProducts)
        }
        else {
            res.status(400).send({ message: 'No product data found' })
        }
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
router.post('/addProduct', validate, async (req, res) => {
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection('All_Products')
    try {
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