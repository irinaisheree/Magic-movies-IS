const Movie = require('../models/Movie');


const uniqid = require('uniqid');


exports.getAll = () => Movie.find();

//TODO: Filter result in MongoDB

exports.search = async (title, genre, year) => {

        let result = await Movie.find().lean()
    if(title){

        result = result.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase()))
    }

    if(genre){
        result = result.filter(movie => movie.genre.toLowerCase().includes(genre.toLowerCase()))
    }

    if(year){
        result = result.filter(movie => movie.year == Number(year))
    }

    return result
}
 
exports.getOne = (movieId) => Movie.findById(movieId)

   


exports.create =  (movieData) => Movie.create(movieData)
 