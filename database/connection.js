const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((err) => console.log(err))

const db = mongoose.connection;

db.on('connected', () => {
  console.log('connected to Mongo')
})

db.once('open', function () {
  db.collection('collection', function (err, collection) {
    collection.find({}).toArray(function (err, data) {
    })
  })
})
