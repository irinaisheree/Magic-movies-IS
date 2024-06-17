const router = require('express').Router()

const authManager = require('../managers/authManager')
const { getErrorMessage } = require('../utils/errorUtils')

router.get('/register', (req, res) => {
    res.render('auth/register')
})

router.post('/register', async(req, res) => {
    const userData = req.body

try {
    await authManager.register(userData);
    res.redirect('/auth/login')

} catch (err) {
const message = getErrorMessage(err)
 res.render('auth/register', {...userData, error: message})
}

})

router.get('/login', (req, res) => {
    res.render('auth/login')
})

router.post('/login', async(req, res) => {
    const {email, password} = req.body
    try {
        const token =  await authManager.login(email, password)

   console.log(token)
   res.cookie('auth', token)
    res.redirect('/')
        
    } catch (err) {
        let message = getErrorMessage(err)
        res.render('auth/login', {error: message})
        
    }
   
})

router.get('/logout', (req, res) => {
    res.clearCookie('auth')
    res.redirect('/')
})

module.exports = router