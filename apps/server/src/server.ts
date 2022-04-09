import express = require("express");

const API_ROOT = "/api/v1";
const PORT = 431;

const app = express();

app.get(`${API_ROOT}/ping`, (request, response, next) => {
  response.status(200).json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
