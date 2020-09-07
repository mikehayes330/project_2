$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.name);
  });
  const submitBtn = $("#submitBtn");
  // when submit button is clicked the we open a new webpage to the search ternm fgor google
  submitBtn.on("click", e => {
    e.preventDefault();
    const searchTerm = $("#google")
      .val()
      .trim();
    window.open("https://www.google.com/search?q=" + searchTerm);
    searchTerm.val("");
  });
  const APIKEY = "iYuBzpWZ8zDUHFI7z0S3VrwjPKiRAFv233EFa-cxW7U";
  $.get(
    "https://api.unsplash.com/photos/random?client_id=" +
      APIKEY +
      "&count=1&orientation=landscape"
  ).then(res => {
    const background = res[0].urls.full;
    const body = $("body");
    const photoLink = $("#photoLink");
    body.css("background-image", "url(" + background + ")");
    photoLink.innerHTML("<a>" + background + "</a>");

    console.log(res[0]);
  });
});
