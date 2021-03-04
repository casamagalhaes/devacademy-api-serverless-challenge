const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}))

const ProductService = require("../services/products"); 
//const productService = new ProductService();
const getAll = require('../services/products');
const create = require('../services/products');
//GET

// /**  app.get('/', (req, res) => {
//     res.status(200).send('hello world!');
//  });

//  //GET req Simply sends the current time
//  app.get('/time', (req, res) => {
//     let timeNow = Date(Date.now());
//     res.status(200).send(timeNow.toString());
//  });

//  //POST req logs the name and sends it
//  //To check send a POST req with "name" and check your lambda function console
//  app.post('/logthis', (req, res) => {
//     const name = req.body.name;
//     const toLog = `\n >>> My name is ${name} <<< \n`
//     console.info(toLog)
//     res.status(200).send(toLog);
//  });
// */

'use strict';
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid/v4');

const productsTable = process.env.WKS_TABLE;
// Create a response
function response(statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  };
}
function sortByDate(a, b) {
  if (a.createdAt > b.createdAt) {
    return -1;
  } else return 1;
}
// Create a post
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
        error: 'Product must have a name and price and they must not be empty'
      })
    );
  }
  const product = {
    id: uuid(),
    name:reqBody.name,
    price:reqBody.price
  };
  const data = await create(product);
  return data;
};
// Get all posts
module.exports.getProduct =  (event, context, callback) =>  {
  //  try { 
  //     const products =  await getAll();
  //     return products;
  //  } catch (error) {
  //     return error;
  //  }

  return db
    .scan({
      TableName: postsTable
    })
    .promise()
    .then((res) => {
      callback(null, response(200, res.Items));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};
  
// Get number of posts
module.exports.getPosts = (event, context, callback) => {
  const numberOfPosts = event.pathParameters.number;
  const params = {
    TableName: postsTable,
    Limit: numberOfPosts
  };
  return db
    .scan(params)
    .promise()
    .then((res) => {
      callback(null, response(200, res.Items.sort(sortByDate)));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};
// Get a single post
module.exports.getProductId = (event, context, callback) => {
  const id = event.pathParameters.id;

  const params = {
    Key: {
      id: id
    },
    TableName: postsTable
  };

  return db
    .get(params)
    .promise()
    .then((res) => {
      if (res.Item) callback(null, response(200, res.Item));
      else callback(null, response(404, { error: 'Post not found' }));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
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
    TableName: productsTable,
    ConditionExpression: 'attribute_exists(id)',
    UpdateExpression: 'SET name = :name, price = :price',
    ExpressionAttributeValues: {
      ':name': name,
      ':price': price
    },
    ReturnValues: 'ALL_NEW'
  };
 // console.log('Updating');

  return db
    .update(params)
    .promise()
    .then((res) => {
      console.log(res);
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
    TableName: productsTable
  };
  return db
    .delete(params)
    .promise()
    .then(() =>
      callback(null, response(200, { message: 'Product deleted successfully' }))
    )
    .catch((err) => callback(null, response(err.statusCode, err)));
};



module.exports = app;