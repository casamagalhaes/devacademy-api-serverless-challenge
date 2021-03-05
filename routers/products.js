const { DataMapper } = require("@aws/dynamodb-data-mapper");
const { DynamoDbSchema, DynamoDbTable } = require("@aws/dynamodb-data-mapper");
const { Endpoint } = require("aws-sdk");
const DynamoDB = require("aws-sdk/clients/dynamodb");
const uuid = require("uuid").v4;

class ProductsObject {}

Object.defineProperties(ProductsObject.prototype, {
  [DynamoDbTable]: {
    value: process.env.PRODUCTS_TABLE || "WKS-Ravi-Products",
  },
  [DynamoDbSchema]: {
    value: {
      id: {
        type: "String",
        keyType: "HASH",
      },
      nome: { type: "String" },
    },
  },
});

module.exports = class Products {
  constructor(method, value) {
    this.method = method;
    this.value = value;
    console.log("value: " + JSON.stringify(this.value));

    this.mapper = new DataMapper({
      client: new DynamoDB({
        endpoint: process.env.DYNAMODB_ENDPOINT
          ? new Endpoint(process.env.DYNAMODB_ENDPOINT)
          : undefined,
      }), // the SDK client used to execute operations
    });
  }

  async getResponse() {
    switch (this.method) {
      case "GET":
        return await this.get();
      case "POST":
        return await this.post();
      case "PUT":
        return await this.put();
      case "DELETE":
        return await this.delete();
      default:
        return { statusCode: 400, body: "Error in method" };
    }
  }

  createRequeste(value) {
    return { statusCode: 200, body: value };
  }

  async get() {
    var value;

    if (this.value["filter"])
      value = "this is get method. Filter: " + this.value["filter"];
    else if (this.value["id"])
      await this.mapper
        .get(Object.assign(new ProductsObject(), { id: this.value["id"] }))
        .then((myItem) => {
          console.log(
            "myItem: " + myItem + "\n" + "myItem.nome: " + myItem.nome
          );
          value = myItem;
        })
        .catch((err) => {
          console.log("erro in mapper :", err);
        });
    else value = "this is get method";

    return this.createRequeste(value);
  }

  async post() {
    const toSave = Object.assign(new ProductsObject(), {
      id: uuid(),
      nome: this.value["nome"],
    });
    await this.mapper
      .put(toSave)
      .then((objectSaved) => {
        console.log("salvo com sucesso: " + JSON.stringify(objectSaved));
      })
      .catch((err) => {
        console.log("erro in mapper to save: " + err);
      });
  }

  async put() {
    const toSave = Object.assign(new ProductsObject(), {
      id: "541654654",
      nome: "",
    });
    await this.mapper
      .put(toSave)
      .then((objectSaved) => {
        console.log("salvo com sucesso: " + JSON.stringify(objectSaved));
      })
      .catch((err) => {
        console.log("erro in mapper to save: " + err);
      });
  }

  async delete() {
    await this.mapper.delete(
      Object.assign(new ProductsObject(), {
        id: this.value["id"],
      })
    );
  }
};
