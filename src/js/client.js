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
  $('#searchForm').on('submit', () =>{
    const searchText = $('.searchText').val();
    // console.log(searchText);
    getMovie(searchText);
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
    console.log(data.data.Search[0]);

  })
  .catch((err)=>{
    console.log(err);
  });
}

$.get('http://www.omdbapi.com/?s=' + 'ronin')
.done(data => {
  //will equal data.responseJSON
  console.log(data);
  // const movies = data.data.Search;
  // const output = '';

})
.fail(err => {
  console.log(err);
});


// //promise executes when request is made
// .done(data => {
//   //data that we get back will equal data.responseJSON as we had in the previous example (when using .get())
//   //can access the full response object by providing a third argument in done()
//   console.log(data);
