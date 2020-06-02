const fs = require('fs');

const writeUrl = fs.createWriteStream('data.csv', {flags: 'w'});
writeUrl.write('imageone|imagetwo|imagethree|imagefour|imagefive\n', 'utf8');

let imageUrls = [
  'https://go.aws/3cs4GI6',
  'https://go.aws/2ZTSldg',
  'https://go.aws/3eIO1S2',
  'https://go.aws/2XQWf3V',
  'https://go.aws/2ZXRtnZ',
  'https://go.aws/2Mm0bUU',
  'https://go.aws/3eH1wlr',
  'https://go.aws/3dnorSE',
  'https://go.aws/2MiCf4H',
  'https://go.aws/3ey6zEK',

  'https://go.aws/2ArmTIK',
  'https://go.aws/2XnfAum',
  'https://go.aws/2AyoCMs',
  'https://go.aws/2U0hWgO',
  'https://go.aws/2yRqfnI',
  'https://go.aws/3cosfBC',
  'https://go.aws/2MjYrM7',
  'https://go.aws/2XJUB3S',
  'https://go.aws/3ct819L',
  'https://go.aws/2XJUKUY',

  'https://go.aws/3eMjumJ',
  'https://go.aws/3gTW6pc',
  'https://go.aws/2ZVb0W9',
  'https://go.aws/3eDE9ZZ',
  'https://go.aws/2XowUiM',
  'https://go.aws/2yXvEK8',
  'https://go.aws/2yURLRt',
  'https://go.aws/3ciDnQA',
];

function writeTenMillionUrl(writer, encoding, callback) {
  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const imageOne = imageUrls[Math.floor(Math.random() * 28)];
      const imageTwo = imageUrls[Math.floor(Math.random() * 28)];
      const imageThree = imageUrls[Math.floor(Math.random() * 28)];
      const imageFour = imageUrls[Math.floor(Math.random() * 28)];
      const imageFive = imageUrls[Math.floor(Math.random() * 28)];
      const data = `${imageOne}|${imageTwo}|${imageThree}|${imageFour}|${imageFive}\n`;
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
