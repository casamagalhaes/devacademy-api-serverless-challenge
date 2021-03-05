const Products = require("./routers/products");

module.exports = class Router {
  constructor(event) {
    this.event = event;
  }

  IsJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  async configureRouter() {
    const { event } = this;
    console.log("event: " + JSON.stringify(event));
    const { httpMethod } = event;
    const { queryStringParameters } = event;
    const { path } = event;
    const { body } = event;

    var queryString = JSON.stringify(queryStringParameters);
    var query = JSON.parse(queryString);

    var pathString = JSON.stringify(path);
    pathString = pathString.split("/")[1];
    console.log("path: aaaaaaaaa " + pathString);

    if (
      (httpMethod == "GET" || httpMethod == "DELETE" || httpMethod == "PUT") &&
      query == null
    ) {
      pathString = JSON.stringify(path);
      var id = pathString.split("/")[2];

      if (id != undefined) {
        id = id.substring(0, id.length - 1);
        if (id == "") return { statusCode: 500, body: "event null" };
        else query = { id: id };
      } else {
        return { statusCode: 400, body: "event null" };
      }
    }

    if (httpMethod == "POST" && body != null) {
      query = JSON.parse(body);
    }

    console.log(JSON.stringify(query));
    const products = new Products(httpMethod, query);

    if (event == null) return { statusCode: 400, body: "event null" };

    return {
      statusCode: 200,
      body: JSON.stringify(await products.getResponse()),
    };
  }
};
