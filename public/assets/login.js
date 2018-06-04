$('#login').on('click', function(){

  let user = {
  username: $('#username').val().trim().toLowerCase(),
  email: $('#email').val().trim().toLowerCase(),
  };

  $.post('api/login', user, function(data){
  }).then(function(response){
    localStorage.setItem("myReadingListUsername",user.username);
    localStorage.setItem("myReadingListEmail",user.email);  
    //get id to client so can join with user's additions
    localStorage.setItem("myReadingListId",response.id);

    //must be a better way to do this...
    let redir = window.location.href + `?username=${user.username}&email=${user.email}&id=${response.id}`;
    window.location.assign(redir);

  });

});