var express = require("express");

// var config = require('../config/default.json');

var router = express.Router();

router.get("/categories", (req, res) => {
  res.render("view_posts/categories-post");
});

router.get("/category/single", (req, res) => {
  res.render("view_posts/single-post");
});

//single post

// router.get("/edit/:id", (req, res) => {
//   var id = req.params.id;
//   if (isNaN(id)) {
//     res.render("error", {
//       layout: false
//     });
//     return;
//   }
//   categoryModel.single(id).then(rows => {
//     if (rows.length > 0) {
//       res.render("categories/edit", {
//         error: false,
//         category: rows[0]
//       });
//     } else {
//       res.render("categories/edit", {
//         error: true
//       });
//     }
//   });
// });

// tên không dấu
// router.get("/:title_asni", (req, res) => {
//   res.render("single-post");
// });

module.exports = router;
