var express = require('express');
var router = express.Router();
const { client, dbName } = require('./../config/dbConfig')
const { hashPassword, hashCompare, createToken } = require('../common/auth')

// get all users
router.get('/', async (req, res) => {
  await client.connect()
  const db = client.db(dbName)
  const collection = db.collection('All_Users')
  try {
    let allUsers = await collection.find().toArray()
    if (allUsers.length) {
      res.status(200).send(allUsers)
    }
    else {
      res.status(400).send({ message: 'No user data found' })
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

// user login
router.get('/login', async (req, res) => {
  await client.connect()
  const db = client.db(dbName)
  const collection = db.collection('All_Users')
  try {
    let user = await collection.aggregate([{ $match: { email: req.query.email } }]).toArray()
    if (user.length) {
      // let passwordCheck = await hashCompare(req.query.password, user[0].password)
      if (await hashCompare(req.query.password, user[0].password)) {
        let token = createToken({ name: user[0].name, email: user[0].email })
        res.status(200).send({ message: 'Login successful', userData: user, tokenData: token })
      }
      else {
        res.status(400).send({ message: 'Invalid login credentials' })
      }
    }
    else {
      res.status(400).send({ message: 'Invalid login credentials' })
    }
  }
  catch (error) {
    // console.log(error);
    res.status(500).send({ message: 'Internal server error', error })
  }
  finally {
    client.close()
  }
});

// user signup
router.post('/signup', async (req, res) => {
  await client.connect()
  const db = client.db(dbName)
  const collection = db.collection('All_Users')
  try {
    let user = await collection.aggregate([{ $match: { email: req.body.email } }]).toArray()
    if (user.length) {
      res.status(400).send({ message: "Email address already exist" })
    }
    else {
      const userInfo = await collection.aggregate([{ $sort: { userId: -1 } }]).toArray()
      if (userInfo.length) {
        req.body.userId = userInfo[0].userId + 1
      }
      else {
        req.body.userId = 1
      }
      let hashedPassword = await hashPassword(req.body.password)
      req.body.password = hashedPassword
      await collection.insertOne(req.body)
      res.status(201).send({ message: 'Signup successful', data: req.body })
    }
  }
  catch (error) {
    // console.log(error)
    res.status(500).send({ message: 'Internal server error', error })
  }
  finally {
    client.close()
  }
})

module.exports = router;