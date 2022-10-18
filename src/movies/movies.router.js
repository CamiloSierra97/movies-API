const router = require('express').Router()

const moviesServices = require('./movies.services')


router.get('/', moviesServices.getMovies)
router.post('/', moviesServices.postMovie)

router.get('/:id', moviesServices.getOneMovie)
router.patch('/:id', moviesServices.patchMovie)
router.delete('/:id', moviesServices.deleteOneMovie)
// router.put('/:id')

module.exports = router