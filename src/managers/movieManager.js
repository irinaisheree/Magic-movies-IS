
const uniqid = require('uniqid')
const movies = [
    {
        id : uniqid(),
        title : 'Fight Club',
        genre: "action",
        description : 'best movie ever',
        poster : "https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        director : "David Fincher",
        year : 1999,
        rating: 8

    }, 
    {
        id : uniqid(),
        title : 'The Shawshak Redemption',
        genre: "drama",
        description : 'awesome movie',
        poster : "https://m.media-amazon.com/images/I/815qtzaP9iL._AC_UF894,1000_QL80_.jpg",
        director : "Stephen King",
        year : 1994,
        rating: 9
    },
    {
        id : uniqid(),
        title : 'The Matrix',
        genre: "action",
        description : 'super nice movie',
        poster : "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
        director : "Lilly Wachowski",
        year : 1999,
        rating: 8
    }
]

exports.getAll = (title, genre, year) => {
    let result = movies.slice()

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
 
exports.getOne = (movieId) => movies.find(x => x.id === movieId)


exports.create = (movieData) => {

    const newMovie = {
        id: uniqid(),
        ...movieData
     }
 movies.push(newMovie)

 return newMovie 


}