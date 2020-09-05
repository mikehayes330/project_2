// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("members");
    }
    res.render("index");
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("members");
    }
    res.render("login");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    db.Bookmark.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(bookmark => {
      res.render("members", {
        bookmark: bookmark
      });
    });
  });
  //  route added to the addBookmark page.
  app.get("/addBookmark", isAuthenticated, (req, res) => {
    db.Bookmark.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(bookmark => {
      res.render("addBookmark", {
        bookmark: bookmark
      });
    });
  });
};
