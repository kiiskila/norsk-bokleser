const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Testing...");
});

app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`)
);
