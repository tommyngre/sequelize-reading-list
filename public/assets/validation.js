function checkLocalStorage(){
  if (window.localStorage.getItem("myReadingListEmail") === null) {
    return false;
  } 
  return window.localStorage.getItem("myReadingListEmail");
}

//let validation = checkLocalStorage();

$('#login').on('click', function(){

  let user = {
  username: $('#username').val().trim(),
  email: $('#email').val().trim(),
  };

  localStorage.setItem("myReadingListUsername",user.username);
  localStorage.setItem("myReadingListEmail",user.email);

  $.post('api/login', user, function(data){
  }).then(function(){
    location.reload();
  });

});