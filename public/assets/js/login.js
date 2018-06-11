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
  if (!user.email.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)) {
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