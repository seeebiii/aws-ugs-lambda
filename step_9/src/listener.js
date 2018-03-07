let AWS = require('aws-sdk');
let db = new AWS.DynamoDB.DocumentClient();

module.exports = function(event, context, callback) {
  console.log('Handling event: ', JSON.stringify(event));


  // see: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#update-property
  let item = {
    TableName: process.env.TABLE_NAME,
    Key: {
      Id: 'item_count'
    },
    UpdateExpression: 'set JsonCounter = if_not_exists(JsonCounter, :start) + :inc',
    ExpressionAttributeValues: {
      ':start': 0,
      ':inc': 1
    }
  };

  db.update(item).promise().then(res => {
    console.log('Added DB item.');
  }).catch(err => {
    console.log('Error happened during DB operation: ', JSON.stringify(err));
  });
};
