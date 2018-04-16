const https = require('https');
const qs = require('querystring');
// const chalk = require('chalk');
const requestConfig = require('../config/request');

const ocrRequest = (image, params) => {
  return new Promise((resolve, reject) => {
    const body = qs.stringify({
      'image': image,
    });

    // console.log(body);
    const options = Object.assign({
      path: `${params.path}?access_token=${requestConfig.accessToken}`,
    }, requestConfig.params);

    const chunk = [];
    const req = https.request(options, (res) => {
      res.setEncoding('utf8');
      res.on('data', (data) => {
        chunk.push(data);
      });
      res.on('end', () => {
        resolve(chunk);
      });
      res.on('error', (err) => {
        reject(err);
      });
    });
    req.write(body);
    req.end();
  });
};

module.exports = ocrRequest;
