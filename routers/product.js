//const Router = require("./../lib/router");
const ProductService = require("../services/products");
//const productService = new ProductService();
const awsServerlessExpress = require('aws-serverless-express');
//const app = require('./app');
const app = require('serverless-express/express');
const server = awsServerlessExpress.createServer(app);
const r = awsServerlessExpress();
const productService = require('../services/products')
const router = server.Router();

// const express = require('express');
// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({extended:false}))

//const c = express.Router();
//app.user.

//const router = new Router({ prefix: "products" });

router.get("/", async () => {
  const data = await productService.findAll();
  return data;
});

// router.post("/", async (req, res) => {
//   const data = await productService.create(req.bodyParsed);
//   return res(data, { statusCode: 201 });
// });

// router.get("/{id}", async (req) => {
//   const data = await productService.findById(req.params.id);
//   return data;
// });

// router.put("/{id}", async (req) => {
//   const data = await productService.update(req.params.id, req.bodyParsed);
//   return data;
// });

// router.delete("/{id}", async (req, res) => {
//   await productService.delete(req.params.id);
//   return res(null, { statusCode: 204 });
// });

module.exports = router;
