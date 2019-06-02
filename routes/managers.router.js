var express = require("express");
var userModel = require("../models/user.model");

var config = require("../config/default.json");

var router = express.Router();

router.get("/", (req, res) => {
  // res.end("sb admin");
  res.render("view_managers/index", {
    layout: "sbadmin"
  });
});

router.get("/tables", (req, res) => {
  res.render("view_managers/tables", {
    layout: "sbadmin"
  });
});

router.get("/charts", (req, res) => {
  res.render("view_managers/charts", {
    layout: "sbadmin"
  });
});

router.get("/categories", (req, res) => {
  res.end("managers/categories");
  // res.render("categories-post");
});

router.get("/subcategories1", (req, res) => {
  res.end("managers/subcategories1");
  // res.render("categories-post");
});

router.get("/user_permission", (req, res) => {
  res.end("managers/user_permission");
  // res.render("categories-post");
});

router.get("/users", (req, res, next) => {
  // res.end("managers/users")

  userModel
    .allForTable()
    .then(rows => {
      res.render("view_managers/vm_users/m_user", {
        layout: "sbadmin",
        users: rows
      });
    })
    .catch(next);
});

router.get("/posts", (req, res) => {
  res.end("managers/posts");
  // res.render("categories-post");
});

router.get("/comments", (req, res) => {
  res.end("managers/comments");
  // res.render("categories-post");
});

router.get("/post_images", (req, res) => {
  res.end("managers/post_images");
  // res.render("categories-post");
});

router.get("/subscribers", (req, res) => {
  res.end("managers/subscribers");
  // res.render("categories-post");
});

router.get("/writers", (req, res) => {
  res.end("managers/writers");
  // res.render("categories-post");
});

module.exports = router;
