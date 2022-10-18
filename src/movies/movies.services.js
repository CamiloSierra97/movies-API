const moviesControllers = require("./movies.controller");

const getMovies = (req, res) => {
  moviesControllers
    .getAllMovies()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const postMovie = (req, res) => {
  const movie = req.body;
  if (movie.name && movie.genre && movie.duration && movie.releaseDate) {
    moviesControllers
      .creatNewMovie(movie)
      .then((response) => {
        res.status(201).json(movie);
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  } else {
    res.data(400).json({ message: "Missing data" });
  }
};

const getOneMovie = (req, res) => {
  const id = req.params.id;
  moviesControllers
    .getMovieById(id)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: "Invalid ID" });
      }
    })
    .catch((err) => {
      res.status(404).json({ message: err.message });
    });
};

const patchMovie = (req, res) => {
  const id = req.params.id;
  const { name, genre, duration, releaseDate } = req.body;
  moviesControllers
    .editMovie(id, { name, genre, duration, releaseDate })
    .then((response) => {
      if (response[0]) {
        res.status(200).json({
          message: `Movie with id: ${id}, edited succesfully`,
        });
      } else {
        res.status(400).json({ message: "Invalid ID" });
      }
    })
    .catch((error) => {
      res.status(400).json({ message: err.message });
    });
};

const deleteOneMovie = (req, res) => {
  const id = req.params.id;
  moviesControllers
    .deleteMovie(id)
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(400).json({ message: "Invalid ID" });
      }
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

const putMovie = (req, res) => {
  const id = req.params.id;
  const { name, genre, duration, releaseDate } = req.body;
  if (name && genre && duration && releaseDate) {
    moviesControllers
      .editMovie(id, { name, genre, duration, releaseDate })
      .then((response) => {
        if (response[0]) {
          res
            .status(200)
            .json({ message: `Movie with id: ${id}, edited succesfully` });
        } else {
          res.status(404).json({ message: "Invalid ID" });
        }
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  } else {
    res.status(400).json({
      message: "Missing data",
      fields: {
        name: "String",
        genre: "String",
        duration: "Number",
        releaseDate: "YYYY/MM/DD",
      },
    });
  }
};

module.exports = {
  getMovies,
  postMovie,
  getOneMovie,
  patchMovie,
  deleteOneMovie,
  putMovie,
};
