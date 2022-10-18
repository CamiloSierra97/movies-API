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
  const data = req.body;
  if (data.name && data.genre && data.duration && data.releaseData) {
    moviesControllers(data)
      .then((response) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  } else {
    res.status(400).json({ message: "Missing data" });
  }
};

const getOneMovie = (req, res) => {
  const id = req.params.id;
  moviesControllers
    .getMovieById(id)
    .then((data) => {
      if(data){
        res.status(200).json(data);
      } else {
        res.status(404).json({message: 'Invalid ID'});
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
      if(response[0]){
        res.status(200).json({
          message: `Movie with id: ${id}, edited succesfully`,
        });
      } else {
        res.status(400).json({message: 'Invalid ID'});
      }
    })
    .catch((error) => {
      res.status(400).json({ message: err.message });
    });
};

module.exports = {
  getMovies,
  postMovie,
  getOneMovie,
  patchMovie,
};
