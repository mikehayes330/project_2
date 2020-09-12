$(document).ready(() => {
  const APIKEY = "iYuBzpWZ8zDUHFI7z0S3VrwjPKiRAFv233EFa-cxW7U";
  const submitBtn = $("#submitBtn");

  setInterval(() => {
    const currentTimeDiv = $("#currentTime");
    const currentDayDiv = $("#currentDate");
    const currentTime = moment().format("h:mm:ss A");
    const currentDay = moment().format("dddd, MMM Do");
    currentTimeDiv.text(currentTime);
    currentDayDiv.text(currentDay);
  }, 1000);
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.name);
  });

  // when submit button is clicked the we open a new webpage to the search ternm fgor google
  submitBtn.on("click", e => {
    e.preventDefault();
    const searchTerm = $("#google")
      .val()
      .trim();
    window.open("https://www.google.com/search?q=" + searchTerm);
    searchTerm.val("");
  });

  $.get(
    "https://api.unsplash.com/photos/random?client_id=" +
      APIKEY +
      "&count=1&orientation=landscape"
  ).then(res => {
    const background = res[0].urls.regular;
    const backgroundCredit = res[0].links.html;
    const body = $("body");
    const photoLink = $("#photoLink");
    body.css("background-image", "url(" + background + ")");
    photoLink.attr("href", backgroundCredit);
  });
});
