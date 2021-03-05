const App = require("./lib/app");
const customersRouter = require("./routes/customers");

module.exports.customersHandler = async (event) => {
  const app = new App(event);

  try {
    app.router(customersRouter);
    return await app.handler();
  } catch (error) {
    console.error(error);
    return app.makeResponse({
      statusCode: 500,
      body: "Erro interno",
    });
  }
};
