atconst express = require("express");

const app = express();

app.get("/", (req, res) => {
<<<<<<< HEAD
  res.send("Build 9 deployed");
=======
  res.send("CI/CD Pipeline New feature");
>>>>>>> develop
});

app.listen(3000, () => {
  console.log("Running on port 3000");
});// test
// test
// test
<<<<<<< HEAD
=======
// test
// feature branch test
>>>>>>> feature/login
