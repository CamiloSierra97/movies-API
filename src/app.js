const express = require("express");

const app = express();

const db = require("./utils/database");

const initModels = require("./models/initModels");

const config = require("./config");

const moviesRouter = require("./movies/movies.router");

db.authenticate()
  .then(() => console.log("DB Autentication Succesfully"))
  .catch(() => console.log(err));

db.sync()
  .then(() => console.log("Database Synced"))
  .catch(() => console.log(err));

initModels();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server OK!" });
});

app.use("/movies", moviesRouter);

app.listen(config.port, () => {
  console.log(`Server started at port ${config.port}`);
});
