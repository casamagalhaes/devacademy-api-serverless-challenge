//const { DynamoDbSchema, DynamoDbTable } = require("@aws/dynamodb-data-mapper");
var dynamo = require('dynamodb');
//var dynamodb = new AWS.DynamoDB();

module.exports = Product = dynamo.define('WSK-product-ovidio', {
    hashKey : 'id',
    schema : {
        id: {
        type: "String",
        keyType: "HASH",
      },
      name: { type: "String" },
      price: { type: "Number" },
    }
  });

//let t = new AWS.DynamoDB.DocumentClient();
  
//Product.config({dynamodb: dynamodb});module.exports = Product;
// 