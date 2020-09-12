$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
  const nameInput = $("input#name-input");
  const APIKEY = "iYuBzpWZ8zDUHFI7z0S3VrwjPKiRAFv233EFa-cxW7U";

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      name: nameInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.name);
    emailInput.val("");
    passwordInput.val("");
    nameInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, name) {
    $.post("/api/signup", {
      email: email,
      password: password,
      name: name
    })
      .then(() => {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
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
