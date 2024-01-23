const movieRouter = require('express').Router()

const movieManager = require('../managers/movieManager')

movieRouter.get('/create', (req, res) => {
    res.render('create')
})

movieRouter.post('/create', (req, res) => {
   const {title, genre, director, year, poster, rating, description} = req.body

   console.log(req.body)
   movieManager.create(req.body)
     
     res.redirect('/')

})

movieRouter.get('/:movieId/details', (req, res) => {
    const movieId = req.params.movieId
    let movie = movieManager.getOne(movieId)
    res.render('details', {movie})

 
    if(!movie){
     return res.redirect('/404')
    }
 
     res.render('details', {...cube})

})

movieRouter.get('/search', (req, res) => {
    const {title, genre, year} = req.query
    movies = movieManager.getAll(title, genre, year)
        res.render('search', {movies, title, genre, year})
})



module.exports = movieRouter