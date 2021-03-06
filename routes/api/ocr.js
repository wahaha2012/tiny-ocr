const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const ImageLoader = require('../../components/imageLoader');

// http://ai.baidu.com/docs#/OCR-API/66a18c08
const textOcr = require('../../components/textOcr');
// http://ai.baidu.com/docs#/ImageClassify-API/top
const carOcr = require('../../components/carOcr');
const logoOcr = require('../../components/logoOcr');
const dishOcr = require('../../components/dishOcr');
const animalOcr = require('../../components/animalOcr');
const plantOcr = require('../../components/plantOcr');
const generalOcr = require('../../components/generalOcr');

const getOcrApp = (type) => {
  let app = textOcr;
  switch(type) {
    case 'car':
      app = carOcr;
      break;
    case 'logo':
      app = logoOcr;
      break;
    case 'animal':
      app = animalOcr;
      break;
    case 'plant':
      app = plantOcr;
      break;
    case 'dish':
      app = dishOcr;
      break;
    case 'common':
      app = generalOcr;
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
