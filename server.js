const http = require("http");
const url = require("url");
const querystring = require("querystring");
const { productsHandler } = require("./products-index");
const { customersHandler } = require("./customers-index");


const PORT = 3000;

// function to convert an request to event json that lambda expects
const eventRequestGenerator = (httpMethod, path, body, headers) => {
  const parsedPath = url.parse(path);
  const queryStringParameters = querystring.parse(parsedPath.query);

  return {
    httpMethod,
    path: parsedPath.pathname,
    queryStringParameters,
    // requestContext: {},
    headers: {
      accept: "*/*",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "en-US,en;q=0.9",
      "access-control-request-headers": "authorization",
      "access-control-request-method": "GET",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "x-amzn-trace-id": "Root=1-5df50966-fcef36da4eaf8f4abedb80ea",
      "x-forwarded-for": "191.6.8.217",
      "x-forwarded-port": "443",
      "x-forwarded-proto": "https",
      ...(headers || {}),
    },
    body: body || "null",
    isBase64Encoded: false, 
  };
};

const getBody = async (req) =>
  new Promise((resolve) => {
    let body = [];
    req
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", () => {
        body = Buffer.concat(body).toString();
        resolve(body);
      });
  });

const server = http.createServer(async (req, res) => {
  const label = `${new Date().toISOString()} | [${req.method}] ${req.url}`;
  console.time(label);

  const body = await getBody(req);
  const event = eventRequestGenerator(req.method, req.url, body, req.headers);
  console.log(req.url)
  if(req.url.includes("customers"))
    const response = await customersHandler(event, {});
  else
    const response = await productsHandler(event, {});

  res.writeHead(response.statusCode, response.headers);

  //Anderson, this response.isBase64Encoded will ever be false,
  //you defined it above. That is the reason why the example you
  //tried to make failed.
  if (response.isBase64Encoded) {
    res.end(Buffer.from(response.body, "base64"));
  } else {
    res.end(response.body);
  }

  console.timeEnd(label);
});

server.listen(PORT, () => {
  console.log(`O servidor foi iniciado na porta ${PORT} | http://localhost:${PORT}`);
});
