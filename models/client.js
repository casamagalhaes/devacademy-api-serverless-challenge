const { DynamoDbSchema, DynamoDbTable } = require("@aws/dynamodb-data-mapper");


var Client = dynamo.define('WSK-client-ovidio', {
    hashKey : 'id',
    schema : {
        id: {
        type: "String",
        keyType: "HASH",
      },
      name: { type: "String" },
      cpf: { type: "String" },
    }
  });

  
module.exports = Client;