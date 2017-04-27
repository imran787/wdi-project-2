
$(document).ready(()=>{
  $('#searchForm').on('submit', searchForFilms);
  // if ($('#homepageYo').length > 0) {
  //   $('body').css('background-image', 'url(https://images.unsplash.com/photo-1485727296248-6b44e6a35ab6?dpr=1&auto=format&fit=crop&w=1199&h=675&q=80&cs=tinysrgb&crop=&bg=)').addClass('bigImage');
  //   $('body').addClass('bigImage');
  // } else {
  //   $('body').css('background-image', '');
  // }
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
        `<a target="_blank" href="${movie.Poster}"><img src="${movie.Poster}" class="img-thumbnail" style='margin-top:-1px;'></a>`+
        `<h5>${movie.Title}</h5>`+
        `<p>Director: ${movie.Director}</p>`+
        `<p>Cast: ${movie.Actors}</p>`+
        `<p>IMDB Rating: ${movie.imdbRating}</p>`+
        `<a target="_blank" class="btn  submissionBtn" href="${movie.Website}" >More Info</a>`+
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
        '<div class="posterIndex">'+
        `<img src="${result.Poster}" class="indexImages">`+
        `<div class="title-container">` +
        `<h5 style="color:white;">${result.Title}</h5>`+
        `</div>` +
        `<a class="btn btn-primary submissionBtn" href="/reviews/new/?title=${result.Title}&poster=${result.Poster}" style="margin-right:2px;">Submit a Review</a>`+
        `<a target="_blank" class="btn btn-primary" style="margin-left:2px;" href="http://www.imdb.com/title/${result.imdbID}" >More Info</a>`+
        '</div>' +
        '</div>';


        // <div class="col-md-4 text-center img-holder container">
        // <div class="posterIndex">
        // <img class="indexImages" src="<%= review.image %>">

        $('#containerHome').hide();

        $(contentString).appendTo('.filmShow');
      });
      $('.submissionBtn').on('click', postData);
    })
    .catch((err)=>{
      console.log(err);
    });
  }

// <div class="col-md-3 text-center img-holder container">

  getMovieInfo();

  function postData(e) {
    var filmInfo = $(e.target).parent();
    var data = {};
    var filmName = filmInfo.find('h5').text();
    var poster = filmInfo.find('img').attr('src');
    data.name = filmName;
    data.poster = poster;
    console.log(data);
    // console.log(filmName);
    // console.log(poster);
    $.post(`${window.location.origin}`, { data });
  }

  function getQueryHashes() {
    if ($('#titleCheck').length > 0) {
      var vars = [], hash;
      var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      for(var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
      }
      console.log(vars);
      var title = vars.title.replace(/20/g, '').replace(/%/g, ' ');
      var poster = vars.poster;
      console.log(title);
      console.log(poster);
      $('#title').attr('value', title);
      $('#image').attr('value', poster);
      $(`<img class="newPoster" src="${poster}">`).appendTo($('#titleHeader'));
    }
  }

  getQueryHashes();
});
// href="/films/${result.imdbID}/reviews/new"


// '<div class="col-md-3 text-center img-holder container">'+
// `<img src="${result.Poster}" class="img-thumbnail indexImages">`+
// `<h5>${result.Title}</h5>`+
// `<a class="btn btn-primary submissionBtn" href="/reviews/new/?title=${result.Title}&poster=${result.Poster}">Submit a Review</a>`+
// `<a target="_blank" class="btn btn-primary" href="http://www.imdb.com/title/${result.imdbID}" >More Info</a>`+
// '</div>';
