var express = require("express");
var postModel = require("../models/post.model");
var categoryModel = require("../models/categories.model");
var db = require("../utils/db");
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
//slug_name: tên không dấu
router.get("/single/:slug_name", (req, res, next) => {
  console.log("posts/single/slug_name");
  var slug_name = req.params.slug_name;
  console.log(slug_name);

  if (!slug_name || slug_name.length === 0) {
    res.render("404", {
      layout: false
    });
    return;
  }

  postModel.singleByExist("slug_title", slug_name, 0).then(rows => {
    if (rows.length > 0) {
      res.render("view_posts/single-post_publish", {
        error: false,
        post_publish: rows[0]
        // post_categories: res.locals.post_categories
      });
    } else {
      res.render("404", {
        // error: true
        layout: false
      });
    }
  });
});

//chỗ này sẽ hiển thị các bài báo sau khi nhấn vào category hoặc subcategory
//slug-title: tên không dấu
router.get("/menu/:slug_title", (req, res, next) => {
  console.log("posts/meunu/slug-title");
  var slug_title = req.params.slug_title;
  console.log(slug_title);

  if (!slug_title || slug_title.length === 0) {
    res.render("404", {
      layout: false
    });
    return;
  }

  db.load(
    `select category.slug_name , post.* 
      from post join category on post.id_category = category.id
      where category.slug_name = '${slug_title}' and category.is_delete = 0 and post.is_delete = 0`
  ).then(rows => {
    if (rows.length > 0) {
      console.log(rows.length);
      // console.log(rows);
      res.render("view_posts/group-post", {
        error: false,
        post_publish: rows
        // post_categories: res.locals.post_categories
      });
    } else {
      res.render("404", {
        // error: true
        layout: false
      });
    }
  });

  //res.render("home");
});

//chỗ này sẽ hiển thị các bài báo sau khi nhấn vào category hoặc subcategory
//tagname: tên tên tag
router.get("/tag/:tagname", (req, res, next) => {
  
  
  //res.render("home");
});

//chỗ này sẽ hiển thị các bài báo sau khi search
//keyword: từ khoá tìm kiếm
router.get("/search/:keyword", (req, res, next) => {
  res.render("home");
});

module.exports = router;
