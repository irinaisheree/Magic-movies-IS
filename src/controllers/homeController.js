const router = require("express").Router()
const movieManager = require("../managers/movieManager")
const castRouter = require("./castController")
const movieRouter = require('./movieController')
const authRouter = require('./authController')
    
router.get("/", async(req, res) => {
    const movies = await movieManager.getAll().lean()
    res.render("home", {movies})
})

router.get('/about', (req, res) => {
    res.render("about")
})

router.get('/404', (req, res) => {
    res.render('404')
})

router.use(movieRouter)
router.use('/cast', castRouter)
// router.use('/auth', authRouter)

// router.get('*', (req, res) => {
//     res.status(404).render('404')
// })

module.exports = router