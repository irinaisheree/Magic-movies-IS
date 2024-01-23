const movieRouter = require('express').Router()

const movieManager = require('../managers/movieManager')

movieRouter.get('/create', (req, res) => {
    res.render('create')
})

movieRouter.post('/create', (req, res) => {
   const {title, genre, director, year, imageUrl, rating, description} = req.body

   console.log(req.body)
   movieManager.create(req.body)
     
     res.redirect('/')

})

movieRouter.get('/:movieId/details', (req, res) => {
    const movieId = req.params.movieId
    let movie = movieManager.getOne(movieId)
    res.render('details', {movie})
})


module.exports = movieRouter