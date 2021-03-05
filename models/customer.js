const { DynamoDbSchema, DynamoDbTable } = require("@aws/dynamodb-data-mapper");

class Customer {
  constructor(opts) {
    if (opts) {
      Object.keys(opts).forEach((key) => {
        this[key] = opts[key];
      });
    }
  }
}

Object.defineProperties(Customer.prototype, {
  [DynamoDbTable]: {
    value: process.env.CUSTOMERS_TABLE || "customers",
  },
  [DynamoDbSchema]: {
    value: {
      id: {
        type: "String",
        keyType: "HASH",
      },
      name: { type: "String" },
      age: { type: "Number" },
    },
  },
});

module.exports = Customer;