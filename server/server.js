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
  let newRecord = req.body.newRecord;
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
  const newRecord =  req.body.newRecord;
  const gameTitle = req.body.gameTitle;
  db.updateRecord(gameTitle, newRecord, (err, success) => {
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
  const gameTitle = req.body.gameTitle;
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
