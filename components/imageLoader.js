const http = require('http');
const https = require('https');
// var fs = require('fs');

class ImageLoader {
  constructor() {

  }

  static read(url) {
    return new Promise((resolve, reject) => {
      this.request(url).then((data) => {
        // console.log(data);
        resolve(data)
      }).catch((err) => {
        reject(err);
      });
    });
  }

  static request(url) {
    return new Promise((resolve, reject) => {
      var protocol = url.indexOf('https') > -1 ? https : http;
      protocol.get(url, (res) => {
        var imageData = [];
        res.setEncoding('binary');
        res.on('data', (chunk) => {
          imageData.push(chunk);
        });
        res.on('end', () => {
          var imageBase64 = new Buffer(imageData.join(''), 'binary').toString('base64');
          resolve(imageBase64);
        });
        res.on('error', (err) => {
          reject(err);
        });
      });
    });
  }
}

module.exports = ImageLoader;