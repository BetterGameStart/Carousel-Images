const express = require('express');
const db = require('../database/database.js');
const seed = require('../database/seed.js');

const faker = require('faker');

const app = express();
const PORT = 3003;

app.use('/games/:gameId', express.static(`${__dirname}/../public`));
app.use(express.json());


// Create

app.post('/post', (req, res) => {
  let newRecord = {
    gameTitle: faker.name.title(),
    newPrice: 59.99,
    preOwnedPrice: 54.99,
    digitalPrice: 59.99,
    mainImage: seed.randomMainImage(),
    images: seed.randomImages(),
  }
  db.createNewRecord(newRecord, (err, success) => {
    if (err) {
      res.send(404);
    } else {
      res.send(200);
    }
  })
  res.end();
});

// Read

app.get('/carousel/:gameId', (req, res) => {
  db.getGameForTopCarousel(req.params.gameId, (err, result) => {
    if (err) {
      res.status(404).end();
    } else {
      res.status(200).send(result);
    }
  });
});

// Update

app.put('/put', (req, res) => {
  let newRecord = {
    gameTitle: faker.name.title(),
    newPrice: 59.99,
    preOwnedPrice: 54.99,
    digitalPrice: 59.99,
    mainImage: seed.randomMainImage(),
    images: seed.randomImages(),
  }
  let gameTitle = '';
  db.updateRecord(gameTitle, param, (err, success) => {
    if (err) {
      res.send(404);
    } else {
      res.send(200);
    }
  });
  res.end();
});

// Delete

app.delete('/delete', (req, res) => {
  const gameTitle = 'game'
  db.deleteRecord(gameTitle, (err, success) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
    }
  })
  res.end();
});

app.listen(PORT, () => {
  console.log(`Listening at port:${PORT}`);
});
