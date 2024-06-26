const movieRouter = require('express').Router()

const movieManager = require('../managers/movieManager')
const castManager = require('../managers/castManager')
const { isAuth } = require('../middlewares/authMiddleware')
const { getErrorMessage } = require('../utils/errorUtils')

movieRouter.get('/create', isAuth,(req, res) => {
    res.render('create')
})

movieRouter.post('/create', isAuth, async (req, res) => {
   console.log(req.body)
   const newMovie = {
    ...req.body,
    owner: req.user._id
   }

   try{
    await movieManager.create(newMovie)
    res.redirect('/')
   }catch(err){
    const message = getErrorMessage(err)
    res.status(400).render('create', {error : message, ...newMovie})
   }
})

movieRouter.get('/movies/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId
    try{
        const movie = await movieManager.getOne(movieId).lean()
        const isOwner = movie.owner && movie.owner == req.user?._id//movie.owner(object) ==  req.user._id(string) (convirts them to the same type)
        // const casts = await castManager.getByIds(movie.casts).lean() --- only if populate is not used(populates the cast info into the movie with the ref: Cast in the Movie Schema)
        res.render('movie/details', {movie, isOwner})
} catch(error){
    console.log(error.message)
}
    
})

movieRouter.get('/search', async (req, res) => {
    const {title, genre, year} = req.query
    movies =await movieManager.search(title, genre, year).lean()
        res.render('search', {movies, title, genre, year})
})

movieRouter.get('/movies/:movieId/attach', isAuth, async(req, res) => {
    const movie = await movieManager.getOne(req.params.movieId).lean()
    const casts = await castManager.getAll().lean()

    res.render('movie/attach', { ...movie, casts})

})

movieRouter.post('/movies/:movieId/attach', isAuth, async(req, res) => {
    const castId = req.body.cast
    await movieManager.attach(req.params.movieId, castId)

 
   res.redirect(`/movies/${req.params.movieId}/attach`)
})

movieRouter.get('/movies/:movieId/edit', isAuth, async (req, res) => {
    if(!req.user){
        return res.redirect('/auth/login')
    }
    const movie = await movieManager.getOne(req.params.movieId).lean()
    res.render('movie/edit', {movie})
})
   
movieRouter.post('/movies/:movieId/edit', isAuth, async(req, res) => {
    const editedMovie = req.body
    await movieManager.edit(req.params.movieId, editedMovie)
    res.redirect(`/movies/${req.params.movieId}/details`)
})


movieRouter.get('/movies/:movieId/delete', isAuth, async(req, res) => {
    await movieManager.delete(req.params.movieId)
    res.redirect('/')
})

module.exports = movieRouter