var express = require("express");
var postModel = require("../models/post.model");
var categoryModel = require("../models/categories.model");

var router = express.Router();

// categories cho navbar

router.get("/categories", (req, res) => {
  categoryModel.all().then(cats => {
    categoryModel.allSubCategory1().then(subs => {
      res.render("view_posts/categories-post", {
        post_categories: cats,
        post_subcategories: subs
      });
    });
  });
});

router.get("/category/single", (req, res) => {
  // res.render("view_posts/single-post");
  // res.render("view_posts/single-post_test");
  res.render("view_posts/single-post_publish");
});

router.get("/category/singleArticles", (req, res) => {
  // res.render("view_posts/single-post");
  // res.render("view_posts/single-post_test");
  res.render("view_posts/single-post");
});

//single post

router.get("/category/:id", (req, res, next) => {
  var id = req.params.id;
  if (isNaN(id)) {
    res.render("error", {
      layout: false
    });
    return;
  }
  categoryModel.all().then(cats => {
    categoryModel.allSubCategory1().then(subs => {
      postModel.single(id).then(rows => {
        if (rows.length > 0) {
          // console.log("post.router rows");
          // console.log(rows);
          // console.log("post.router rows[0]");
          // console.log(rows[0]);
          // console.log(rows[0].content);

          res.render("view_posts/single-post_publish", {
            error: false,
            post_publish: rows[0],
            post_categories: cats,
            post_subcategories: subs
          });
        } else {
          res.render("error", {
            error: true
          });
        }
      });
    });
  });
});

// tên không dấu
// router.get("/:title_asni", (req, res) => {
//   res.render("single-post");
// });

module.exports = router;
