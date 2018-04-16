const chalk = require('chalk');
const ocrRequest = require('./ocrRequest');

const textOcr = (image) => {
  return new Promise((resolve, reject) => {
    ocrRequest(image, {
      path: '/rest/2.0/ocr/v1/general',
    }).then((chunk) => {
      const temp = JSON.parse(chunk.join(''));
      const wordsTemp = [];
      if (temp && temp.words_result) {
        temp.words_result.forEach((item) => {
          wordsTemp.push(item.words);
        });
      }
      console.log(chalk.yellow('Text OCR Finished'));
      resolve({
        code: 200,
        data: Object.assign({
          text: wordsTemp,
        }, temp),
      });
    }).catch((err) => {
      reject(err);
    });
  });
};

module.exports = textOcr;
