var express = require("express");
var userModel = require("../models/user.model");
var postModel = require("../models/post.model");
var categoryModel = require("../models/categories.model");
var config = require("../config/default.json");
var router = express.Router();

router.get("/", (req, res) => {
  //phải đăng nhập và là writer thì mới được vào trang writer
  if (/*res.locals.isAuthenticated && res.locals.is_writer*/ true) {
    res.render("view_writers/index", {
      layout: "writer_layout"
    });
  } else {
    res.render("404", {
      layout: false
    });
  }
});

router.get("/tables", (req, res) => {
  //phải đăng nhập và là writer thì mới được vào trang writer
  if (res.locals.isAuthenticated && res.locals.is_writer) {
    res.render("view_writers/vm_neat/tables", {
      layout: "writer_layout"
    });
  } else {
    res.render("404", {
      layout: false
    });
  }
});

router.get("/charts", (req, res) => {
  //phải đăng nhập và là writer thì mới được vào trang writer
  if (res.locals.isAuthenticated && res.locals.is_writer) {
    res.render("view_writers/vm_neat/charts", {
      layout: "writer_layout"
    });
  } else {
    res.render("404", {
      layout: false
    });
  }
});

router.get("/writing", (req, res) => {
  if (res.locals.isAuthenticated && res.locals.is_writer) {
    categoryModel
    .all()
    .then(rows => {
      res.render("view_writers/writing", {
        layout: "writer_layout",
        category:rows
      });
    })
  } else {
    res.render("404", {
      layout: false
    });
  }
});


router.post("/writing", (req, res, next) => {
  var user_id=req.body.writer_id;
  const entity ={
    title : req.body.title,
    slug_title: req.body.slug,
    summary :req.body.summary,
    id_category :req.body.category,
    content :req.body.FullDes,
    id_user: user_id,
    pseudonym: 'đéo biết lấy bút danh'
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
 
  // if (res.locals.isAuthenticated && res.locals.is_writer) {
  //   // res.end("view_writers/writing");
  //   res.render("view_writers/writing", {
  //     layout: "writer_layout"
  //   });
  // } else {
  //   res.render("404", {
  //     layout: false
  //   });
  // }

  // res.render("categories-post");

router.get("/subcategories1", (req, res) => {
  if (res.locals.isAuthenticated && res.locals.is_writer) {
    res.end("managers/subcategories1");
  } else {
    res.render("404", {
      layout: false
    });
  }

  // res.render("categories-post");
});

router.get("/user_permission", (req, res) => {
  if (res.locals.isAuthenticated && res.locals.is_writer) {
    res.end("managers/user_permission");
  } else {
    res.render("404", {
      layout: false
    });
  }

  // res.render("categories-post");
});

router.get("/users", (req, res, next) => {
  // res.end("managers/users")
  if (res.locals.isAuthenticated && res.locals.is_writer) {
    userModel
      .allForTable()
      .then(rows => {
        res.render("view_writers/vm_users/m_user", {
          layout: "writer_layout",
          users: rows
        });
      })
      .catch(next);
  } else {
    res.render("404", {
      layout: false
    });
  }
});

router.get("/posts", (req, res) => {
  if (res.locals.isAuthenticated && res.locals.is_writer) {
    res.end("managers/posts");
  } else {
    res.render("404", {
      layout: false
    });
  }

  // res.render("categories-post");
});

router.get("/comments", (req, res) => {
  if (res.locals.isAuthenticated && res.locals.is_writer) {
    res.end("managers/comments");
  } else {
    res.render("404", {
      layout: false
    });
  }

  // res.render("categories-post");
});

router.get("/post_images", (req, res) => {
  if (res.locals.isAuthenticated && res.locals.is_writer) {
    res.end("managers/post_images");
  } else {
    res.render("404", {
      layout: false
    });
  }

  // res.render("categories-post");
});

router.get("/subscribers", (req, res) => {
  if (res.locals.isAuthenticated && res.locals.is_writer) {
    res.end("managers/subscribers");
  } else {
    res.render("404", {
      layout: false
    });
  }

  // res.render("categories-post");
});

router.get("/writers", (req, res) => {
  if (res.locals.isAuthenticated && res.locals.is_writer) {
    res.end("managers/writers");
  } else {
    res.render("404", {
      layout: false
    });
  }

  // res.render("categories-post");
});

module.exports = router;
