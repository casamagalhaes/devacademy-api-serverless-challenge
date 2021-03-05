const { handler } = require("./index");
const express = require("express");
const router = require("./routers");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");

var app = express();

app.use(awsServerlessExpressMiddleware.eventContext());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log(req.query);
  res.json({ status: "Server is running!" });
});

app.post("/", (req, res) => {
  res.json({ status: "In post :)" });
});

app.get("/products", (req, res) => {
  console.log(req.query);
  res.json({ status: "I'm get response of products :)" });
});

app.post("/products", (req, res) => {
  res.json({ status: "I'm post response of products :)" });
});

app.listen(3000, () => {
  console.log(`O endpoit de testes foi iniciado na porta  | http://localhost:`);
});
