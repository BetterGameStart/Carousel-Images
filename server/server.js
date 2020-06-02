const nr = require('newrelic');
const express = require('express');
const { Pool } = require('pg');
const PASSWORD = require('../database/passwordIgnore.js');

const app = express();
const PORT = 3003;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'images',
  password: PASSWORD.PASSWORD,
  port: 5432
});

pool.connect();

app.use('/games/:gameId', express.static(`${__dirname}/../public`));
app.use(express.json());


// Create

app.post('/post', (req, res) => {
  pool.query(`INSERT INTO images VALUES ('${req.body.url}')`, (err, results) => {
    if (err) {
      res.status(404);
    } else {
      res.status(200);
    }
    res.end()
  });
});

// Read

app.get('/carousel/:gameId', (req, res) => {
  pool.query(`SELECT * FROM images WHERE id = ${req.params.gameId}`, (err, results) => {
    if (err) {
      res.status(404);
    } else {
      let images = [];
      for (let key in results.rows[0]) {
        if (typeof results.rows[0][key] === 'string') {
          images.push(results.rows[0][key]);
        }
      }
      res.send({images: images});
    }
    res.end()
  });

});

// Update

app.put('/put', (req, res) => {
  pool.query(`UPDATE images SET image = '${req.body.url}' WHERE id = ${req.body.id}`, (err, results) => {
    if (err) {
      res.status(404);
    } else {
      res.status(200);
    }
    res.end()
  });
});

// Delete

app.delete('/delete', (req, res) => {
  pool.query(`DELETE * FROM images WHERE id = '${req.body.id}'`, (err, results) => {
    if (err) {
      res.status(404);
    } else {
      res.status(200);
    }
    res.end()
  });
});

app.listen(PORT, () => {
  console.log(`Listening at port:${PORT}`);
});
