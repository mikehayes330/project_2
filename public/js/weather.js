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
    "https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=" +
    weatherLat +
    "&lon=" +
    weatherLon +
    "&appid=" +
    weatherAPI;
  $.get(weatherURL, data => {
    const weatherIcon = data.weather[0].icon;
    const weatherIconUrl =
      "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
    console.log(weatherIconUrl);
    $("#iconDisplay").html(`<img src="${weatherIconUrl}"/>`);
    $("#tempDisplay").text(parseInt(data.main.temp) + "\u00B0 F");
    $("#cityDisplay").text(data.name);
  });
}
getLocation();
// displays time to page every second
