let AWS = require('aws-sdk');
let db = new AWS.DynamoDB.DocumentClient();

module.exports = function(event, context, callback) {
  console.log('Handling event: ', JSON.stringify(event));

  // see: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property
  let params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      Id: 'item_count'
    }
  };

  db.get(params).promise().then(res => {
    console.log('DB response: ', res);

    let item = res.Item;
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(item)
    });
  }).catch(err => {
    console.log('Error happened while retrieving counter: ', JSON.stringify(err));

    callback(null, {
      statusCode: 500,
      body: 'Internal Server Error'
    });
  });
};
