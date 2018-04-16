const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const ImageLoader = require('../../components/imageLoader');

// http://ai.baidu.com/docs#/OCR-API/66a18c08
const textOcr = require('../../components/textOcr');
// http://ai.baidu.com/docs#/ImageClassify-API/top
const carOcr = require('../../components/carOcr');

const getOcrApp = (type) => {
  let app = textOcr;
  switch(type) {
    case 'car':
      app = carOcr;
      break;
  }
  return app;
};

const imageOcr = (res, type, imageData, params) => {
  getOcrApp(type)(imageData).then((json) => {
    res.send(Object.assign(params, json));
  }).catch((err) => {
    console.log(chalk.red(err));
  });
}

router.post('/', (req, res, next) => {
  // req.query.url
  if (req.body.url) {
    ImageLoader.read(req.body.url).then((imageData) => {
      imageOcr(res, req.body.type, imageData, {
        image: 'data:image/jpeg;base64,' + imageData,
      });
    });
  } else if(req.body.image) {
    imageOcr(res, req.body.type, req.body.image, {});
  }
});

module.exports = router;
