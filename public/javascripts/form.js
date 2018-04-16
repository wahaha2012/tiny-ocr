var output = document.getElementById('output');
var preview = document.getElementById('preview');
var imageType = document.getElementById('imageType');

var submitForm = function(formData) {
  formData.type = String.prototype.toLowerCase.call(imageType.value);
  ajax.post('/api/ocr', formData, 
  {
    type: 'json',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(function(response){
    return response.json();
  }).then(function(data) {
    if (data && data.code === 200) {
      output.value = data.data.text.length ? data.data.text.join('\n') : 'No Data';
      if (data.image) {
        updatePreview(data.image);
      }
    }
  }).catch(function(err){
    // console.log(err);
    output.value = err;
  });

  output.value = 'Loading...';
};

var updatePreview = function(dataURL) {
  preview.src = dataURL;
  // output.value = dataURL;
};

// var toDataURL = function(url, callback) {
//   var xhr = new XMLHttpRequest();
//   xhr.onload = function() {
//     var reader = new FileReader();
//     reader.onloadend = function() {
//       // console.log(new Date());
//       callback(reader.result);
//     }
//     reader.readAsDataURL(xhr.response);
//   };
//   xhr.open('GET', url);
//   xhr.responseType = 'blob';
//   xhr.send();
// }
// var toDataURL = function(src, callback, outputFormat) {
//   var img = new Image();
//   // img.crossOrigin = 'Anonymous';
//   img.onload = function() {
//     var canvas = document.createElement('canvas');
//     var ctx = canvas.getContext('2d');
//     var dataURL;
//     canvas.height = this.naturalHeight;
//     canvas.width = this.naturalWidth;
//     ctx.drawImage(this, 0, 0);
//     dataURL = canvas.toDataURL(outputFormat);
//     callback(dataURL);
//   };
//   img.src = src;
//   if (img.complete || img.complete === undefined) {
//     img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
//     img.src = src;
//   }
// }

// var openUrlFile = function(url) {
//   toDataURL(url, function(dataUrl) {
//     // console.log(dataUrl);
//     if (dataUrl) {
//       updatePreview(dataUrl);
//     }
//   })
// };

var openFile = function(event) {
  var input = event.target;

  var reader = new FileReader();
  reader.onload = function(){
    var dataURL = reader.result;
    document.getElementById('webUrl').value = input.value;
    updatePreview(dataURL);
    submitForm({
      image: dataURL.replace(/data:.+base64\,/,''),
    });
  };
  reader.readAsDataURL(input.files[0]);
};

(function() {
  var loadBtn = document.getElementById('loadBtn');
  var webUrl = document.getElementById('webUrl');

  if (loadBtn) {
    loadBtn.onclick = function() {
      // openUrlFile(webUrl.value);
      webUrl.value = webUrl.value.replace('tp=webp&', '');
      submitForm({
        url: webUrl.value,
      });
    };
  }
})();

// openUrlFile('https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0');