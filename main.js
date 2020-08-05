function login() {
  //berhasil login
  localStorage.setItem('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIyQG1haWwuY29tIiwiaWQiOjEsImlhdCI6MTU5NjU5OTQzN30.nR_Uh8O9GKMLUIQRq-mqUeUwA9yjZC-tHrRxr4bzXo4')
  $('#form-login').hide();
  $('#form-register').hide();
  $('#form-add-movie').show();
  $('#movie-list').show();

  fetchMovies();
}

function fetchMovies() {
  $('#top-movie').empty();

  const PATH = 'http://localhost:3000'
  $.ajax({
    method: 'GET',
    url: `${PATH}/movies`,
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done((response) => {
    console.log(response);
    response.data.forEach(element => {
      $('#top-movie').append(`
        <div class="col-3">
        <div class="card">
          <img src="${element.poster}" class="card-img-top" alt="${element.title}">
          <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">Genre: ${element.genre}</p>
          </div>
        </div>
      </div>
      `)
    });

  })
  .fail((xhr, status, error) => {
    console.log(xhr);
  })
  .always((response) => {
    console.log('always');
  })
}

$(document).ready(function() {
  if (!localStorage.getItem('access_token')) {
    $('#form-login').show();
    $('#form-register').hide();
    $('#form-add-movie').hide();
    $('#movie-list').hide();
  } else {
    $('#form-login').hide();
    $('#form-register').hide();
    $('#form-add-movie').show();
    $('#movie-list').show();
  }

  // 1. hit POST /users/login
  // 2. data: { email: $('#email').val(), password: $('#password').val() }
  // 3. done((response) { 
  //  localStorage.setItem('access_token', response.access_token) })
  //  


  login();

  $('#nav-login').click(function(event) {
    event.preventDefault();
    $('#form-login').show();
    $('#form-register').hide();
    $('#form-add-movie').hide();
    $('#movie-list').hide();
  })

  $('#nav-register').click(function(event) {
    event.preventDefault();
    $('#form-login').hide();
    $('#form-register').show();
    $('#form-add-movie').hide();
    $('#movie-list').hide();
  })

  $('#nav-home').click(function(event) {
    event.preventDefault();
    $('#form-login').hide();
    $('#form-register').hide();
    $('#form-add-movie').show();
    $('#movie-list').show();
  })
})