module.exports.handler = function(event, context, callback) {
  // good practice: always log the incoming event - e.g. for debugging later
  console.log('Handling event: ', JSON.stringify(event));
};
