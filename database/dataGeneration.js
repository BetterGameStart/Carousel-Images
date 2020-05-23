const generateData = () => {
  let data = [];
  for (let i = 0; i < 357143; i++) {
    for (let j = 1; j < 29; j++) {
      data.push(`https://s3.amazonaws.com/carousel-images.bucket/${j}-370x370.jpg`);
    }
  }
  return data;
}
console.log(typeof generateData());
module.exports.generateData = generateData;