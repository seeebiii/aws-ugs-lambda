let AWS = require('aws-sdk');
let s3 = new AWS.S3();
let data = {
  "id": 1,
  "key": "AMZN",
  "value": 1229
};

module.exports.handler = function(event, context, callback) {
  console.log('Handling event: ', JSON.stringify(event));


  // prepare API call
  // see: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
  let requestParams = {
    Body: JSON.stringify(data),
    Bucket: process.env.DATA_BUCKET,
    Key: new Date().getTime() + '.json'
  };

  // call API
  s3.putObject(requestParams).promise().then(res => {
    console.log('Uploaded file.');
  }).catch(err => {
    console.log('Error happened during upload: ', JSON.stringify(err));
  });
};
