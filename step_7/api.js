let AWS = require('aws-sdk');
// IMPORTANT: set region when invoking with sam local, otherwise DynamoDB can't find your table
let db = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2'});

module.exports = function(event, context, callback) {
  console.log('Handling event: ', JSON.stringify(event));
  console.log('table: ', process.env.TABLE_NAME);

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
