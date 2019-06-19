var express = require("express");
var postModel = require("../models/post.model");
var categoryModel = require("../models/categories.model");

var router = express.Router();

// categories cho navbar

router.get("/categories", (req, res) => {
  res.render("view_posts/categories-post", {
    // post_subcategories: res.locals.post_categories
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
  postModel.single(id).then(rows => {
    if (rows.length > 0) {
      // console.log("post.router rows");
      // console.log(rows);
      // console.log("post.router rows[0]");
      // console.log(rows[0]);
      // console.log(rows[0].content);

      res.render("view_posts/single-post_publish", {
        error: false,
        post_publish: rows[0]
        // post_categories: res.locals.post_categories
      });
    } else {
      res.render("error", {
        error: true
      });
    }
  });
});

//chỗ này sẽ hiển thị chi tiết 1 bài báo
//category tên không dấu
router.get("/:slug_name", (req, res, next) => {
  console.log("posts/slug_name");
  var slug_name = req.params.slug_name;
  console.log(slug_name);

  if (!slug_name || slug_name.length === 0) {
    res.render("error", {
      layout: false
    });
    return;
  }

  postModel.singleBy(id).then(rows => {
    if (rows.length > 0) {

      res.render("view_posts/single-post_publish", {
        error: false,
        post_publish: rows[0]
        // post_categories: res.locals.post_categories
      });
    } else {
      res.render("error", {
        error: true
      });
    }
  });

  // res.render("view_posts/categories-post.hbs", {
  //   slug_name: slug_name
  // });
});

module.exports = router;
