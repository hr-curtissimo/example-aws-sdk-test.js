const AWS = require('aws-sdk');

const params = {
  TableName: 'Example',
  ReturnConsumedCapacity: 'Total'
};

function toDDB(o) {
  const result = {};
  for (let key of Object.keys(o)) {
    if (typeof o[key] === 'string') {
      result[key] = { S: o[key] };
    } else if (typeof o[key] === 'number') {
      result[key] = { N: o[key].toString() };
    } else if (Array.isArray(o[key])) {
      if (typeof o[key][0] === 'string') {
	result[key] = { SS: o[key] };
      } else if (typeof o[key][0] === 'number') {
	result[key] = { NS: o[key].map(x => x.toString()) };
      }
    }
  }
  return result;
}

module.exports.save = o => {
  const dynamo = new AWS.DynamoDB();
  const item = Object.assign({ Item: toDDB(o) }, params);
  
  return new Promise((good, bad) => {
    dynamo.putItem(item, (err, data) => {
      if (err) return bad(err);
      good(data);
    });
  });
};

exports.handler = exports.save; // Just like a lambda function
