const Router = require("./../lib/router");
const ClientesService = require("../services/clientesService");
const clientesService = new ClientesService();

const router = new Router({ prefix: "clientes" });

router.get("/", async () => {
  const data = await clientesService.findAll(req.query);
  return data;
});

router.post("/", async (req, res) => {
  const data = await clientesService.create(req.bodyParsed);
  return res(data, { statusCode: 201 });
});

router.get("/{id}", async (req) => {
  const data = await clientesService.findById(req.params.id);
  return data;
});

router.put("/{id}", async (req) => {
  const data = await clientesService.update(req.params.id, req.bodyParsed);
  return data;
});

router.delete("/{id}", async (req, res) => {
  await clientesService.delete(req.params.id);
  return res(null, { statusCode: 204 });
});

module.exports = router;