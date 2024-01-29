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

movieRouter.get('/details/:movieId', async (req, res) => {
    const movieId = req.params.movieId
    try{let movie = await movieManager.getOne(movieId).lean()
    
        res.render('details', {movie})
} catch(error){
    console.log(error.message)
}
    
})
 


movieRouter.get('/search', (req, res) => {
    const {title, genre, year} = req.query
    movies = movieManager.search(title, genre, year)
        res.render('search', {movies, title, genre, year})
})

movieRouter.get('/details/:movieId/attach', async(req, res) => {
    const movie = await movieManager.getOne(req.params.movieId).lean()
    res.render('movie/attach', { ...movie })

})



module.exports = movieRouter