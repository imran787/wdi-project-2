
$(document).ready(()=>{
  $('#searchForm').on('submit', searchForFilms);
  if ($('#homepageYo').length > 0) {
    $('body').css('background-image', 'url(https://images.unsplash.com/photo-1485727296248-6b44e6a35ab6?dpr=1&auto=format&fit=crop&w=1199&h=675&q=80&cs=tinysrgb&crop=&bg=)');
  } else {
    $('body').css('background-image', '');
  }
  function searchForFilms(e) {
    e.preventDefault();
    const searchText = $('.searchLanding').val();
    $('.filmShow').empty();
    getMovies(searchText);
  }

  //func to prepopulate the show page with api data
  function getMovieInfo() {
    var movieTitle = $('.searchTitle').text();
    console.log(movieTitle);
    if (movieTitle.length > 1) {
      $.get(`http://www.omdbapi.com?t=${movieTitle}`)
      .done(movie => {
        console.log(movie);

        const tomatoes = movie.Ratings[1];
        console.log(tomatoes);
        const contentString =
        `<div class="container">`+
        '<div class="col-md-3 text-center img-holder row">'+
        `<a target="_blank" href="${movie.Poster}"><img src="${movie.Poster}" class="img-thumbnail"></a>`+
        `<h5>${movie.Title}</h5>`+
        `<a target="_blank" class="btn btn-primary" href="${movie.Website}" >movie website</a>`+
        `<p>Director: ${movie.Director}</p>`+
        `<p>Cast: ${movie.Actors}</p>`+
        `<p>IMDB Rating: ${movie.imdbRating}</p>`+
          '</div>'+
        `</div>`;
        $(contentString).appendTo('.showApi');
      });
    }
  }

  //function api req at search bar
  function getMovies(searchText){
    $.get('http://www.omdbapi.com/?s=' + searchText)
    .done(data =>{
      // console.log(JSON.parse(data));
      console.log(data.Search);
      data.Search.forEach(result => {
        const contentString =
        '<div class="col-md-3 text-center img-holder container">'+
          `<a href="/reviews/new"><img src="${result.Poster}" class="img-thumbnail"></a>`+
        `<h5>${result.Title}</h5>`+
          `<a target="_blank" class="btn btn-primary" href="/reviews/new" >Submit a Review</a>`+
        `<a target="_blank" class="btn btn-primary" href="http://www.imdb.com/title/${result.imdbID}" >More Info</a>`+
        //`<a target="_blank" class="btn btn-primary" href="http://www.imdb.com/title/${result.imdbID}" >More info</a>`+
        '</div>';
        $(contentString).appendTo('.filmShow');

      });
    })
    .catch((err)=>{
      console.log(err);
    });
  }
  getMovieInfo();

});
