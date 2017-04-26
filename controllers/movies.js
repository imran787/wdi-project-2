const rp = require('request-promise');



function getMovie(req, res){
  const options = {
    uri: `http://www.omdbapi.com/?i=${req.params.id}`,
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };
  rp(options)
  .then(movie =>{
    return res.render('reviews/new', {movie});
  })
  .catch(err =>{
    console.log(err);
  });
}

module.exports = {
  getMovie: getMovie
};
