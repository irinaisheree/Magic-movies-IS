const movieRouter = require('express').Router()

const movieManager = require('../managers/movieManager')

movieRouter.get('/create', (req, res) => {
    res.render('create')
})

movieRouter.post('/create', async (req, res) => {
   console.log(req.body)

   try{
    await movieManager.create(req.body)
    res.redirect('/')
   }catch(err){
    console.log(err.message)
    res.redirect('/create')
   }
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