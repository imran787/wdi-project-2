// $(init);
//
// // function init(){
// //
// // }
// const $data = 'http://www.omdbapi.com/?';
//
// function init(){
//   $
//     .get($data)
//     .done(movie => {
//       console.log(movie);
//     });
// }
$(document).ready(()=>{
  $('#searchForm').on('submit', (e) =>{
    e.preventDefault();
    const searchText = $('.searchLanding').val();
    // console.log(searchText);
    $('.filmShow').empty();
    getMovie(searchText);
    // console.log(getMovie(searchText));
    // const result = getMovie(searchText);
    // $(`<p>${result}</p>`).appendTo($('.filmShow'));
    // getMovie(searchText).forEach(result => {
    //   $(`<div class=" col-md-4">${result}</div>`).appendTo('#filmShow');
    // });
  });
});

// function getMovie(searchText){
//   $.get('http://www.omdbapi.com?s=' + searchText)
//   .done(data =>{
//     console.log(data);
//   })
//   .catch((err)=>{
//     console.log(err);
//   });
// }
function getMovie(searchText){
  $.get('http://www.omdbapi.com?s=' + searchText)
  .done(data =>{
    // console.log(JSON.parse(data));
    console.log(data.Search);


    data.Search.forEach(result => {
      const contentString =
      '<div class="col-md-4 text-center">'+
      `<a href="/reviews/new"><img src="${result.Poster}"></a>`+
      `<p>${result.Title}</p>`+
      `<p>${result.Year}</p>`+
      '</div>';
      $(contentString).appendTo('.filmShow');
      // console.log(result.Poster);
    });

    //http://www.imdb.com/title/${result.imdbID}

    // const results = data.Search;

    // const movies = data.Search[0];
    // console.log(movies['Title']);
    // const title = movies['Title'];
    // console.log(title);
    // $('#filmShow').text(title);
    // movies.appendTo('#filmShow');
    // const movies = data.data;

  })
  .catch((err)=>{
    console.log(err);
  });
}

// function getMovie(searchText){
//   $.get('http://www.omdbapi.com?s=' + searchText)
//   .then((response)=>{
//     // console.log(response.Search);
//     let movies = response.Search;
//     let output = '';
//     movies.forEach((movies) =>{
//       $(`<h1>${movies.Title}</h1>`).appendTo('#filmShow');
//       // output += `
//       //   <img src="${movie.Poster}">
//       //   <h3>${movie.Title}</h3>
//       // `;
//       // output.appendTo('#filmShow');
//
//
//     });

//   })
//   .catch((err)=>{
//     console.log(err);
//   });
// }

// $.get('http://www.omdbapi.com/?s=' + 'ronin')
// .done(data => {
//   //will equal data.responseJSON
//   // console.log(data.Search);
//   let movies = data.Search;
//   movies.forEach((film) => {
//     film.appendTo('.filmData');
//   });
//
// })
// .fail(err => {
//   console.log(err);
// });


// //promise executes when request is made
// .done(data => {
//   //data that we get back will equal data.responseJSON as we had in the previous example (when using .get())
//   //can access the full response object by providing a third argument in done()
//   console.log(data);
