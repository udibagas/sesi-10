const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true })); // TODO
app.use(express.json());
app.use(require("./routes"));

app.use((err, req, res, next) => {
  console.log(err);

  if (err.statusCode == 404) {
    return res.status(404).json({
      error: err.name,
      message: err.message,
    });
  }

  res.status(500).json({
    error: "ServerError",
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
