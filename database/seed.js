/* eslint-disable no-plusplus */
const mongoose = require('mongoose');
const faker = require('faker');
const database = require('./database.js');

mongoose.connect('mongodb://localhost/imagesData', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {

  const randomImages = () => {
    const result = [];
    for (let i = 0; i < 5; i++) {
      const random = Math.floor(Math.random() * Math.floor(29) + 1);
      result.push(`https://better-game-start.s3.us-east-2.amazonaws.com/Zoom+Carousel+Images/${random}-370x370.jpg`);
    }
    return result;
  };

  const seed = (entrys) => {
    const allData = [];
    for (let i = 0; i < entrys; i++) {
      const data = {
        images: randomImages(),
      };
      allData.push(data);
    }
    return allData;
  };

  database.ImageData.deleteMany({}, (err) => {
    if (err) {
      console.log('Error Deleting Table', err);
    } else {
      console.log('Table Deleted');
    }
  });

  const allData = seed(100);

  database.ImageData.insertMany([...allData], (err) => {
    if (err) {
      console.log('Error Seeding', err);
    } else {
      db.close();
      console.log('Databse Is Seeded');
    }
  });
});

const randomImages = () => {
  const result = [];
  for (let i = 0; i < 5; i++) {
    const random = Math.floor(Math.random() * Math.floor(29) + 1);
    result.push(`https://better-game-start.s3.us-east-2.amazonaws.com/Zoom+Carousel+Images/${random}-370x370.jpg`);
  }
  return result;
};

module.exports.randomImages = randomImages;