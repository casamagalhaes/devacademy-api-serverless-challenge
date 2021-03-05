'use strict';
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid').v4;

const productTable = process.env.WKS_TABLE_PRODUCT;
const clientTable = process.env.WKS_TABLE_CLIENT;

function response(statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  };
}

module.exports.createProduct = (event, context, callback) => {
  const reqBody = JSON.parse(event.body);
  if (
    !reqBody.price ||
    !reqBody.name ||
    reqBody.name.trim() === ''
  ) {
    return callback(
      null,
      response(400, {
        error: 'The product must have a name and price.'
      })
    );
  }

  const product = {
    id: uuid(),
    name: reqBody.name,
    price: reqBody.price
  };

  return db
    .put({
      TableName: productTable,
      Item: product
    })
    .promise()
    .then(() => {
      callback(null, response(201, product));
    })
    .catch((error) => response(null, response(error.statusCode, error)));
};

module.exports.getAllProduct = (event, context, callback) => {
  return db
    .scan({
      TableName: productTable
    })
    .promise()
    .then((res) => {
      callback(null, response(200, res.Items));
    })
    .catch((error) => callback(null, response(error.statusCode, error)));
};

module.exports.getProductId = (event,context, callback) => {
  const id = event.pathParameters.id;

  const params = {
    Key: {
      id: id
    },
    TableName: productTable
  };

  return db
    .get(params)
    .promise()
    .then((res) => {
      if (res.Item) callback(null, response(200, res.Item));
      else callback(null, response(404, { error: 'Product not found' }));
    })
    .catch((error) => callback(null, response(error.statusCode, error)));
};
// Update a post
module.exports.updateProduct = (event, context, callback) => {
  const id = event.pathParameters.id;
  const reqBody = JSON.parse(event.body);
  const { name, price } = reqBody;

  const params = {
    Key: {
      id: id
    },
    TableName: productTable,
    ConditionExpression: 'attribute_exists(id)',
    UpdateExpression: 'SET name = :n, price = :price',
    ExpressionAttributeValues: {
      ':n': name,
      ':price': price
    },
    ReturnValues: 'ALL_NEW'
  };
 // console.log('Updating');

  return db
    .update(params)
    .promise()
    .then((res) => {
      //console.log(res);
      callback(null, response(200, res.Attributes));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};
// Delete a post
module.exports.deleteProduct = (event, context, callback) => {
  const id = event.pathParameters.id;
  const params = {
    Key: {
      id: id
    },
    TableName: productTable
  };
  return db
    .delete(params)
    .promise()
    .then(() =>
      callback(null, response(200, { message: 'Product deleted successfully' }))
    )
    .catch((error) => callback(null, response(error.statusCode, error)));
};

//Client
module.exports.createClient = (event, context, callback) => {
  const reqBody = JSON.parse(event.body);
  if (
    !reqBody.cpf ||
    !reqBody.name ||
    reqBody.name.trim() === ''
  ) {
    return callback(
      null,
      response(400, {
        error: 'The client must have a name and cpf.'
      })
    );
  }

  const client = {
    id: uuid(),
    name: reqBody.name,
    cpf: reqBody.cpf
  };

  return db
    .put({
      TableName: clientTable,
      Item: client
    })
    .promise()
    .then(() => {
      callback(null, response(201, client));
    })
    .catch((error) => response(null, response(error.statusCode, error)));
};

module.exports.getAllClient = (event, context, callback) => {
  return db
    .scan({
      TableName: clientTable
    })
    .promise()
    .then((res) => {
      callback(null, response(200, res.Items));
    })
    .catch((error) => callback(null, response(error.statusCode, error)));
};

module.exports.getClientId = (event, context, callback) => {
  const id = event.pathParameters.id;

  const params = {
    Key: {
      id: id
    },
    TableName: clientTable
  };

  return db
    .get(params)
    .promise()
    .then((res) => {
      if (res.Item) callback(null, response(200, res.Item));
      else callback(null, response(404, { error: 'Client not found' }));
    })
    .catch((error) => callback(null, response(error.statusCode, error)));
};

module.exports.updateClient =  (event, context, callback) => {
  const id = event.pathParameters.id;
  const reqBody = JSON.parse(event.body);
  const { name, cpf } = reqBody;

  const params = {
    Key: {
      id: id
    },
    TableName: clientTable,
    ConditionExpression: 'attribute_exists(id)',
    UpdateExpression: 'SET name = :n, cpf = :cpf',
    ExpressionAttributeValues: {
      ':n': name,
      ':cpf': cpf
    },
    ReturnValues: 'ALL_NEW'
  };

  return db
    .update(params)
    .promise()
    .then((res) => {
      //console.log(res);
      callback(null, response(200, res.Attributes));
    })
    .catch((error) => callback(null, response(error.statusCode, error)));
};
// Delete a post
module.exports.deleteClient = (event, context, callback) => {
  const id = event.pathParameters.id;
  const params = {
    Key: {
      id: id
    },
    TableName: clientTable
  };
  return db
    .delete(params)
    .promise()
    .then(() =>
      callback(null, response(200, { message: 'Client deleted successfully' }))
    )
    .catch((error) => callback(null, response(error.statusCode, error)));
};
