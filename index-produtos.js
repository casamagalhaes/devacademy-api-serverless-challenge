const App = require("./lib/app");
const produtosRouter = require("./routes/produtosRouter");

module.exports.clinte = async (event) => {
  const app = new App(event);

  try {
    app.router(produtosRouter);
    return await app.handler();
  } catch (error) {
    console.error(error);
    return app.makeResponse({
      statusCode: 500,
      body: "Erro interno",
    });
  }
};