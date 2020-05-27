const fs = require('fs');

const writeUrl = fs.createWriteStream('data.csv', {flags: 'w'});
writeUrl.write('image\n', 'utf8');

function writeTenMillionUrl(writer, encoding, callback) {
  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const url = `https://s3.amazonaws.com/carousel-images.bucket/${id % 28 + 1}-370x370.jpg`;
      const data = `${url}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write()
}

writeTenMillionUrl(writeUrl, 'utf-8', () => {
  console.log('Finished generating data!')
  writeUrl.end();
});