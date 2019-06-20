var express = require("express");
var postModel = require("../models/post.model");
var categoryModel = require("../models/categories.model");
var db = require("../utils/db");
var router = express.Router();
var moment = require("moment");

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
//slug_title: tên không dấu
router.get("/single/:id/:slug_title", (req, res, next) => {
  console.log("posts/single/slug_title");
  var slug_title = req.params.slug_title;
  console.log(slug_title);

  if (!slug_title || slug_title.length === 0) {
    res.render("404", {
      layout: false
    });
    return;
  }
Promise.all([
  db.load(
    `select post.*, 
    category.name as 'catname', category.slug_name as 'cat_slugname',
    subcategory.name as 'subname', subcategory.slug_name as 'sub_slugname'
      from post join category on post.id_category = category.id 
      join subcategory on post.id_subcategory = subcategory.id
      where post.slug_title = '${slug_title}' 
      and post.is_delete = 0 and category.is_delete = 0 and subcategory.is_delete = 0`
  ),
  postModel.getComment(req.params.id)
]).then(([rows,comment]) => {
    console.log(rows.length);
    if (rows.length > 0) {
      res.render("view_posts/single-post_publish", {
        error: false,
        post_publish: rows[0],
        comment,
        count: comment.length
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

// comment single post

router.post("/single/:id/:slug_title", (req, res, next) => {
 
    var entity = {
      displayname: req.body.displayname,
      comment_content: req.body.content,
      comment_date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      last_update: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      id_post: req.params.id
    };
    
    var retUrl =req.query.retUrl ||"/posts/single/"+req.params.id+"/"+req.params.slug_title;
    postModel
      .addComment(entity)
      .then(id => {
        res.redirect(retUrl);
      })
      .catch(next);
  });




//chỗ này sẽ hiển thị các bài báo sau khi nhấn vào category
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
    `select post.* ,
            category.name as 'catname', category.slug_name as 'cat_slugname'
      from post join category on post.id_category = category.id
      where category.slug_name = '${slug_title}' and category.is_delete = 0 and post.is_delete = 0`
  ).then(rows => {
    if (rows.length > 0) {
      console.log(rows.length);
      db.load(
        `select post_tag.*, tag.name as 'tagname'
          from post_tag join tag on post_tag.id_tag = tag.id`
      )
        .then(post_tags => {
          console.log(post_tags.length);
          res.render("view_posts/group-post", {
            error: false,
            post_publish: rows,
            post_tags: post_tags
          });
        })
        .catch(next);
    } //
    else {
      res.render("404", {
        // error: true
        layout: false
      });
    }
  });

  //res.render("home");
});

//chỗ này sẽ hiển thị các bài báo sau khi nhấn vào category/subcategory
//slug-title: tên không dấu
router.get("/menu/:slug_cat/:slug_sub", (req, res, next) => {
  console.log("posts/meunu/slug-cat/slug-sub");
  var slug_cat = req.params.slug_cat;
  var slug_sub = req.params.slug_sub;
  console.log(req.params);
  console.log(slug_cat);
  console.log(slug_sub);

  if (
    !slug_cat ||
    slug_cat.length === 0 ||
    (!slug_sub || slug_sub.length === 0)
  ) {
    res.render("404", {
      layout: false
    });
    return;
  }

  db.load(
    `select post.*,  
		        category.name as 'catname', category.slug_name as 'cat_slugname',
            subcategory.name as 'subname', subcategory.slug_name as 'sub_slugname' 
      from post join category on post.id_category = category.id
      join subcategory on  post.id_subcategory = subcategory.id  
      where category.slug_name = '${slug_cat}' and subcategory.slug_name = '${slug_sub}'
      and category.is_delete = 0 and post.is_delete = 0 and subcategory.is_delete = 0`
  ).then(rows => {
    if (rows.length > 0) {
      console.log(rows.length);
      db.load(
        `select post_tag.*, tag.name as 'tagname'
          from post_tag join tag on post_tag.id_tag = tag.id`
      )
        .then(post_tags => {
          console.log(post_tags.length);
          res.render("view_posts/group-post", {
            error: false,
            is_have_subcategory: true,
            post_publish: rows,
            post_tags: post_tags,
          }
          );
        })
        .catch(next);
    } //
    else {
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
  res.render("home");
});

//chỗ này sẽ hiển thị các bài báo sau khi search
//keyword: từ khoá tìm kiếm
router.get("/search/:keyword", (req, res, next) => {
  res.render("home");
});

module.exports = router;
