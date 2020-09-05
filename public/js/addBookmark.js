$(document).ready(() => {
  // Getting references to our form and input
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.name);
    const userId = data.id;

    const bookmarkTitle = $("#title");
    const bookmarkUrl = $("#url");
    const bookmarkImage = $("#image");
    const submitBtn = $("#submitBtn");

    // submitBtn is clicked we grab bookmark data and post it to api/addBOokmark
    submitBtn.on("click", event => {
      event.preventDefault();
      const bookmarkData = {
        title: bookmarkTitle.val().trim(),
        url: bookmarkUrl.val().trim(),
        image: bookmarkImage.val().trim(),
        UserId: userId
      };

      addNewBookmark(
        bookmarkData.title,
        bookmarkData.url,
        bookmarkData.image,
        userId
      );
      bookmarkTitle.val("");
      bookmarkUrl.val("");
      bookmarkImage.val("");
    });

    function addNewBookmark(title, url, image, UserId) {
      console.log(title, url, image, UserId);
      $.post("/api/addBookmark", {
        title: title,
        url: url,
        image: image,
        UserId: UserId
      })
        .then(() => {
          window.location.replace("/addBookmark");
          // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(handleLoginErr);
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
