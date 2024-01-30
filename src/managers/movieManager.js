const { exists } = require('../models/Cast');
const Movie = require('../models/Movie');


const uniqid = require('uniqid');


exports.getAll = () => Movie.find();

//TODO: Filter result in MongoDB

exports.search = (title, genre, year) => {

        let query = {}
        
    if(title){
    //   result = result.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase()))
    query.title =new RegExp(title, 'i')
    }

    if(genre){
        // result = result.filter(movie => movie.genre.toLowerCase().includes(genre.toLowerCase()))
    query.genre = genre.toLowerCase()
    }

    if(year){
        query.year = year
    }

    return Movie.find(query)
}
 
exports.getOne = (movieId) => Movie.findById(movieId).populate('casts')

exports.create =  (movieData) => Movie.create(movieData)

exports.attach = (movieId, castId) => {

  return Movie.findByIdAndUpdate(movieId, {$push: {casts : castId}})

//   const movie = await this.getOne(movieId)
//    TODO 
//    check if castID exists

//    movie.casts.push(castId)
//    return movie.save()
}
 