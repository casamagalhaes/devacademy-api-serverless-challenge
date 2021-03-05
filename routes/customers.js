const Router = require("./../lib/router");
const CustomerService = require("../services/customer-service");
const customerService = new CustomerService();

const router = new Router({ prefix: "customers" });

router.get("/", async () => {
  const data = await customerService.findAll();
  return data;
});

router.post("/", async (req, res) => {
  const data = await customerService.create(req.bodyParsed);
  return res(data, { statusCode: 201 });
});

router.get("/{id}", async (req) => {
  const data = await customerService.findById(req.params.id);
  return data;
});

router.put("/{id}", async (req) => {
  const data = await customerService.update(req.params.id, req.bodyParsed);
  return data;
});

router.delete("/{id}", async (req, res) => {
  await customerService.delete(req.params.id);
  return res(null, { statusCode: 204 });
});

module.exports = router;
