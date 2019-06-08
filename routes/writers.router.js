var express = require("express");
var userModel = require("../models/user.model");

var config = require("../config/default.json");

var router = express.Router();

router.get("/", (req, res) => {
  console.log("writers");
  console.log(res.body);
  console.log(res.locals);

  // res.render("view_writers/index", {
  //   layout: "writer"
  // });

  //phải đăng nhập và là writer thì mới được vào trang writer
  if (res.locals.isAuthenticated && res.locals.is_writer) {
    // res.end("sb admin");
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
    // res.end("view_writers/writing");
    res.render("view_writers/writing", {
      layout: "writer_layout"
    });
  } else {
    res.render("404", {
      layout: false
    });
  }

  // res.render("categories-post");
});


router.post("/writing", (req, res, next) => {

  console.log(req.body);
  console.log(res.local);

  
  if (res.locals.isAuthenticated && res.locals.is_writer) {
    // res.end("view_writers/writing");
    res.render("view_writers/writing", {
      layout: "writer_layout"
    });
  } else {
    res.render("404", {
      layout: false
    });
  }

  // res.render("categories-post");
});

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
