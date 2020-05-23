/* eslint-disable no-plusplus */
const mongoose = require('mongoose');

const { Schema } = mongoose;

mongoose.connect('mongodb://localhost/imagesData', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => { console.log('Connected to Database'); });


const ImageData = mongoose.model('ImageData', new Schema({
  images: [String],
}), 'imagedatas');

const createNewRecord = (param, callback) => {
  db.create(param, (err, success) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, success);
    }
  });
}

const getGameForTopCarousel = (param, callback) => {
  ImageData.findOne().skip(Number(param)).exec((error, result) => {
    if (error) {
      console.log('Error Getting Carousel Images (findOne)', error);
    } else {
      callback(null, result);
    }
  });
};


const updateRecord = (gameTitle, param, callback) => {
  db.deleteRecord({gameTitle: gameTitle}, (err, success) => {
    if (err) {
      callback(err, null);
    } else{
      db.create(param, (err, success) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, success);
        }
      })
    }
  });
}

const deleteRecord = (param, callback) => {
  ImageData.deleteOne({ gameTitle : param }, (err, result) => {
    if (err) {
      callback(err, null);
      return err;
    } else {
      callback(null, result);
    }
  });
}

module.exports.getGameForTopCarousel = getGameForTopCarousel;
module.exports.createNewRecord = createNewRecord;
module.exports.updateRecord = updateRecord;
module.exports.deleteRecord = deleteRecord;
module.exports.ImageData = ImageData;