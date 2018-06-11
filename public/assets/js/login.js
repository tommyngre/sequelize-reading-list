function promptForCredentials() {
  console.log("here");
  $('#username')
    .val("Enter your name")
    .css('color', 'red')
  $('#email')
    .val("Enter a valid email address")
    .css('color', 'red')
  setTimeout(function () {
    $('#username')
      .val("")
      .css('color', 'black')
    $('#email')
      .val("")
      .css('color', 'black')
  }, 1500);
}

function hasValidCredentials(user) {
  if (user.username == '') {
    return false;
  }
  //sketchy regex seems to do the trick
  if (!user.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    return false;
  }
  return true;
}

$('#login').on('click', function () {

  let user = {
    username: $('#username').val().trim().toLowerCase(),
    email: $('#email').val().trim().toLowerCase(),
  };

  if (hasValidCredentials(user)) {

    //not exactly authentication.... 
    //more like association
    $.post('api/login', user, function (data) {
    }).then(function (response) {
      localStorage.setItem("myReadingListUsername", user.username);
      localStorage.setItem("myReadingListEmail", user.email);
      //picking up User id
      localStorage.setItem("myReadingListId", response.id);

      let redir = `/?username=${user.username}&email=${user.email}&id=${response.id}`;

      window.location.assign(redir);
    });

  } else {
    promptForCredentials(user);
  }

});