atconst express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("CI/CD Pipeline New feature");
});

app.listen(3000, () => {
  console.log("Running on port 3000");
});// test
// test
// test
// test
