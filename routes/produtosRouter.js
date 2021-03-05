const Router = require("./../lib/router");
const ProdutosService = require("../services/produtosService");
const produtosService = new ProdutosService();

const router = new Router({ prefix: "produtos" });

router.get("/", async () => {
  const data = await produtosService.findAll(req.query);
  return data;
});

router.post("/", async (req, res) => {
  const data = await produtosService.create(req.bodyParsed);
  return res(data, { statusCode: 201 });
});

router.get("/{id}", async (req) => {
  const data = await produtosService.findById(req.params.id);
  return data;
});

router.put("/{id}", async (req) => {
  const data = await produtosService.update(req.params.id, req.bodyParsed);
  return data;
});

router.delete("/{id}", async (req, res) => {
  await produtosService.delete(req.params.id);
  return res(null, { statusCode: 204 });
});

module.exports = router;