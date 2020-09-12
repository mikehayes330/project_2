$(document).ready(() => {
  const googleSubmit = $("#googleSubmit");
  const updateBtn = $(".updateButton");

  setInterval(() => {
    const currentTimeDiv = $("#currentTime");
    const currentDayDiv = $("#currentDate");
    const currentTime = moment().format("h:mm:ss A");
    const currentDay = moment().format("dddd, MMM Do");
    currentTimeDiv.text(currentTime);
    currentDayDiv.text(currentDay);
  }, 1000);
  // function to set the background image
  function setBackground() {
    const backgroundImage =
      "https://images.unsplash.com/photo-1555066931-bf19f8fd1085?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE2MzYzN30";
    const body = $("body");
    body.css("background-image", "url(" + backgroundImage + ")");
  }
  //calling function to set background
  setBackground();

  // this will open up new page and search the search term in google.
  googleSubmit.on("click", e => {
    e.preventDefault();
    const searchTerm = $("#google")
      .val()
      .trim();
    window.open("https://www.google.com/search?q=" + searchTerm);
    searchTerm.val("");
  });
  //update the bookmark by using the same input as add the bookmark but uses a differnt button to call it
  updateBtn.on("click", function() {
    const bookmarkTitle = $("#bookmark-title");
    const bookmarkUrl = $("#bookmark-url");
    const id = this.dataset.id;
    const updateBookmarkData = {
      title: bookmarkTitle.val().trim(),
      url: bookmarkUrl.val().trim(),
      id: id
    };
    if (
      updateBookmarkData.title.length === 0 ||
      updateBookmarkData.url.length === 0
    ) {
      alert(
        "Please fill out Add/Edit form with info to edit and choose bookmark to edit"
      );
    } else {
      $.ajax("addBookmark", {
        type: "PUT",
        data: updateBookmarkData
      }).then(() => {
        // Reload the page to get the updated list
        location.reload();
      });
    }
  });

  // get user data for name.
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.name);
    const userId = data.id;

    const bookmarkTitle = $("#bookmark-title");
    const bookmarkUrl = $("#bookmark-url");
    const bookmarkSubmit = $("#bookmarkSubmit");

    // submitBtn is clicked we grab bookmark data and post it to api/addBOokmark
    bookmarkSubmit.on("click", event => {
      event.preventDefault();
      console.log(bookmarkTitle);
      const bookmarkData = {
        title: bookmarkTitle.val().trim(),
        url: bookmarkUrl.val().trim(),
        UserId: userId
      };
      console.log(bookmarkData);
      addNewBookmark(bookmarkData.title, bookmarkData.url, userId);
      bookmarkTitle.val("");
      bookmarkUrl.val("");
    });

    function addNewBookmark(title, url, UserId) {
      console.log(title, title.length, url, url.length);
      if (url.length === 0 || title.length === 0) {
        alert("Please add bookmark Title & bookmark URL");
      } else {
        $.post("/api/addBookmark", {
          title: title,
          url: url,
          UserId: UserId
        })
          .then(() => {
            window.location.replace("/addBookmark");
            // If there's an error, handle it by throwing up a bootstrap alert
          })
          .catch(handleLoginErr);
      }
    }

    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }
  });
  //handles the delete of the bookmark
  $(".delete-bookmark").on("click", function(event) {
    event.preventDefault();
    const id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/bookmark/" + id, {
      type: "DELETE"
    }).then(() => {
      console.log("deleted bookmark", id);
      // Reload the page to get the updated list
      location.reload();
    });
  });
});
