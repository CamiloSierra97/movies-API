const uuid = require("uuid");
const Movies = require("../models/movies.models");

const getAllMovies = async () => {
  const data = await Movies.findAll();
  return data;
};

const creatNewMovie = async (data) => {
  const newMovie = await Movies.create({
    id: uuid.v4(),
    name: data.name,
    genre: data.genre,
    duration: data.duration,
    releaseDate: data.releaseDate,
  });
  return newMovie;
};

const getMovieById = async (id) => {
  const data = await Movies.findOne({
    where: {
      id,
    },
  });
  return data;
};

const editMovie = async (id, data) => {
  const response = await Movies.update(data, {
    where: {
      id,
    },
  });
  return response;
};

// creatNewMovie({
//     name: 'Pulp Fiction',
//     genre: 'Drama',
//     duration: 154,
//     releaseDate: '2014/10/24'
// })
//     .then(res => console.log(res))
//     .catch(err => console.log(err))

// getMovieById('d81e4038-4cb4-494b-8b44-de7566dfb6f2')
// .then(res => console.log(res))
// .catch(err => console.log(err))

// editMovie('da93ac71-7ed8-4c26-90a6-88f1a2605f7d', {
//   releaseDate: '1994/10/14'
// })
//   .then(res => console.log(res))
//   .catch(err => console.log(err))

module.exports = {
  getAllMovies,
  creatNewMovie,
  getMovieById,
  editMovie,
};
