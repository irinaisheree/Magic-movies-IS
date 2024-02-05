const jwt = require('../lib/jwt')
const { SECRET } = require('../config/config')

exports.auth = async (req, res, next) => {
    //get token
    const token = req.cookies['auth']

    if(!token){
        return next()
    }
    //validate token
    try{
        const decodedToken = await jwt.verify(token, SECRET)

        //attach the decoded token object to the user property of the req object
        req.user = decodedToken
        next()
    }catch{
        res.clearCookie('auth')
        res.redirect('/auth/login')
    }
 
}