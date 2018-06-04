// get user id from localStorage
function getMyReadingListId() {
  if (window.localStorage.getItem("myReadingListId") === null) {
    return false;
  }
  return window.localStorage.getItem("myReadingListId");
}


// if nothing in either list, display message
function checkSectionContents() {

  if ($('#havent-read').find('li').length < 1) {
    let html = `<h3 class="none-yet">None yet.</h3>`
    $('#havent-read').append(html);
  };
  if ($('#have-read').find('li').length < 1) {
    let html = `<h3 class="none-yet">None yet.</h3>`
    $('#have-read').append(html);
  };
}

//show message for invalid entry
function showErr(errMessage) {
  $('#item-name').css('color', 'red').val(errMessage);
  setTimeout(function () {
    $('#item-name').css('color', 'black').val("");
  }, 1000);
}

//validate entry
function validate(entry) {
  let isValid = true;
  let errMessage;
  //enforce non null
  if (entry == "") {
    isValid = false;
    showErr("Enter something, dude :P")
  }
  //enforce len
  if (entry.length > 250) {
    isValid = false;
    showErr("255 character max, dude :P")
  }
  return isValid;
}

//CRUD ROUTES BELOW

$(document).on('click', '#add', function () {
  event.preventDefault();

  let userId = getMyReadingListId();
  console.log("userId " + userId);
  if (!userId) {
    console.log("userId " + userId);
    return
  };

  //validate entry
  if (!validate($('#item_name').val().trim())) {
    return;
  }



  let obj = {
    itemName: $('#item_name').val().trim(),
    itemDescription: $('#item_description').val().trim(),
    is_complete: false,
    UserId: userId
  }

  console.log("obj.UserId "+obj.UserId);

  $.post('/api/new', obj, function (data) {
  }).then(function () {
    location.reload();
  });
});

$(document).on('click', '.delete-item', function (event) {
  event.preventDefault();

  let id = $(this).data('id');

  $.ajax("/api/list/" + id,
    {
      type: "DELETE",
    }).then(function () {
      location.reload();
    })

});

$(document).on('click', '.toggle-isComplete', function (event) {
  event.preventDefault();

  let id = $(this).data('id');

  //flip the complete status
  let newCompleteStatus = !($(this).data('iscomplete'));
  let that = this;

  let update = {
    isComplete: Boolean(newCompleteStatus)
  };

  $.ajax("/api/list/" + id,
    {
      type: "PUT",
      data: update
    }).then(function () {
      $(that).data('iscomplete', newCompleteStatus);
      location.reload();
    })
})

$(document).ready(function () {
  //handle if sections are null
  setTimeout(function () {
    checkSectionContents();
  }, 100);
});