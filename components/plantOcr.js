const chalk = require('chalk');
const ocrRequest = require('./ocrRequest');

const plantOcr = (image) => {
  return new Promise((resolve, reject) => {
    ocrRequest(image, {
      path: '/rest/2.0/image-classify/v1/plant',
    }).then((chunk) => {
      const jsonTemp = JSON.parse(chunk.join(''));
      const textTemp = [];
      if (jsonTemp && jsonTemp.result) {
        jsonTemp.result.forEach((item) => {
          textTemp.push(`${item.name}, ${item.score}`);
        });
      }
      console.log(chalk.yellow('Plant OCR Finished'));
      resolve({
        code: 200,
        data: Object.assign({
          text: textTemp,
        }, jsonTemp),
      });
    }).catch((err) => {
      reject(err);
    });
  });
};

module.exports = plantOcr;
