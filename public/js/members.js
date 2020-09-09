$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    const weatherAPI = "64c34ee7c70a13599aaf08ac59e6b5b5";
    const weatherLat = position.coords.latitude;
    const weatherLon = position.coords.longitude;
    const weatherURL =
      "http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=" +
      weatherLat +
      "&lon=" +
      weatherLon +
      "&appid=" +
      weatherAPI;
    $.get(weatherURL, data => {
      console.log(data);
      $("#temp").text(data.main.temp + "F");
      $("#city").text(data.name);
    });
  }
  getLocation();
  // displays time to page every second

  setInterval(() => {
    const currentTimeDiv = $("#currentTime");
    const currentDayDiv = $("#currentDay");
    const currentTime = moment().format("h:mm:ss");
    const currentDay = moment().format("dddd");
    currentTimeDiv.text(currentTime);
    currentDayDiv.text(currentDay);
  }, 1000);

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
    photoLink.HTML("<a>" + background + "</a>");
  });
});
