const { DynamoDbSchema, DynamoDbTable } = require("@aws/dynamodb-data-mapper");

class Produtos {
  constructor(opts) {
    if (opts) {
      Object.keys(opts).forEach((key) => {
        this[key] = opts[key];
      });
    }
  }
}

Object.defineProperties(Produtos.prototype, {
  [DynamoDbTable]: {
    value: process.env.PRODUCTS_TABLE || "products",
  },
  [DynamoDbSchema]: {
    value: {
      id: {
        type: "String",
        keyType: "HASH",
      },
      name: { type: "String" },
      telefone: { type: "String" },
    },
  },
});

module.exports = Product;