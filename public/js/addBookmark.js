$(document).ready(() => {
  // Getting references to our form and input
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.name);
    const userId = data.id;

    const bookmarkTitle = $("#title");
    const bookmarkUrl = $("#url");
    const bookmarkImage = $("#image");
    const submitBtn = $("#submitBtn");

    // When the signup button is clicked, we validate the email and password are not blank
    submitBtn.on("click", event => {
      event.preventDefault();
      const bookmarkData = {
        title: bookmarkTitle.val().trim(),
        url: bookmarkUrl.val().trim(),
        image: bookmarkImage.val().trim(),
        UserId: userId
      };
      console.log(bookmarkData);
      // If we have an email and password, run the signUpUser function
      addNewBookmark(
        bookmarkData.title,
        bookmarkData.url,
        bookmarkData.image,
        userId
      );
      //   bookmarkTitle.val("");
      //   bookmarkUrl.val("");
      //   bookmarkImage.val("");
    });

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
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
});
