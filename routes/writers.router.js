var express = require("express");
var postModel = require("../models/post.model");
var categoryModel = require("../models/categories.model");
var router = express.Router();

router.get("/:id", (req, res, next) => {
  console.log("get id");
  if (res.locals.isAuthenticated && res.locals.is_writer) {
    var id = req.params.id;
    postModel
      .AllPostbyId(id)
      .then(rows => {
        res.render("view_writers/index", {
          layout: "writer_layout",
          post: rows
        });
      })
      .catch(next);
  } else {
    res.render("404", {
      layout: false
    });
  }
});

router.get("/delete/:post_id", (req, res, next) => {
  var post_id = req.params.post_id;
  var retUrl = req.query.retUrl || "/";
  if (res.locals.isAuthenticated && res.locals.is_writer) {
    postModel
      .remove(post_id)
      .then(res.redirect(retUrl))
      .catch(next);
  } else {
    res.render("404", {
      layout: false
    });
  }
});

router.get("/edit/:post_id", (req, res, next) => {
  res.end("edit");
});

router.get("/writing", (req, res, next) => {
  if (res.locals.isAuthenticated && res.locals.is_writer) {
    categoryModel
      .all()
      .then(rows => {
        res.render("view_writers/writing", {
          layout: "writer_layout",
          category: rows
        });
      })
      .catch(next);
  } else {
    res.render("404", {
      layout: false
    });
  }
});

router.post("/writing", (req, res, next) => {
  console.log("post /writing");
  var user_id = req.body.writer_id;
  const entity = {
    title: req.body.title,
    slug_title: req.body.slug,
    summary: req.body.summary,
    id_category: req.body.category,
    content: req.body.content,
    id_user: user_id,
    pseudonym: "k biết lấy bút danh" // thiếu 1 số column
  };
  if (res.locals.isAuthenticated && res.locals.is_writer) {
    postModel
      .addPost(entity)
      .then(id => {
        res.render("view_writers/writing", {
          layout: "writer_layout"
        });
      })
      .catch(next);
  } else {
    res.render("404", {
      layout: false
    });
  }
});


module.exports = router;
