const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true })); // TODO
app.use(express.json());
app.use(require("./routes"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
