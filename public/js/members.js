$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.name);
  });
  const submitBtn = $("#submitBtn");
  const searchTerm = $("#google")
    .val()
    .trim();
  // im working on trying to get the google search on the members page currentlyt not functioning
  submitBtn.on("click", e => {
    e.preventDefault();
    console.log(searchTerm);
  });

  // $("#submitBtn").on("submit", e => {
  //   e.preventDefault();
  //   const searchTerm = $("#google").val();
  //   const queryURL = "https://www.google.com/search?q=" + searchTerm;
  //   console.log(searchTerm, queryURL);
  //   $.ajax({
  //     url: queryURL,
  //     method: "GET"
  //   }).then(response => {
  //     console.log(response);
  //   });
  // });
});
