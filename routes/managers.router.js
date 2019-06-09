var express = require("express");
var userModel = require("../models/user.model");
var categoryModel = require("../models/categories.model");
var config = require("../config/default.json");

var router = express.Router();

router.get("/", (req, res) => {
  console.log("managers");
  console.log(res.body);
  console.log(res.locals);

  //phải đăng nhập và là admin thì mới được vào trang admin
  if (res.locals.isAuthenticated && res.locals.is_admin) {
    // res.end("sb admin");
    res.render("view_managers/index", {
      layout: "sbadmin_layout"
    });
  } else {
    res.render("404", {
      layout: false
    });
  }
});

router.get("/tables", (req, res) => {
  if (res.locals.isAuthenticated && res.locals.is_admin) {
    res.render("view_managers/vm_neat/tables", {
      layout: "sbadmin_layout"
    });
  } else {
    res.render("404", {
      layout: false
    });
  }
});

router.get("/charts", (req, res) => {
  if (res.locals.isAuthenticated && res.locals.is_admin) {
    res.render("view_managers/vm_neat/charts", {
      layout: "sbadmin_layout"
    });
  } else {
    res.render("404", {
      layout: false
    });
  }
});

// ==================== CATEGORIES ====================

router.get("/categories", (req, res, next) => {
  if (res.locals.isAuthenticated && res.locals.is_admin) {
    // res.end("managers/categories");
    categoryModel
      .all()
      .then(rows => {
        res.render("view_managers/vm_categories/m_categories", {
          layout: "sbadmin_layout",
          categories: rows
        });
      })
      .catch(next);
  } else {
    res.render("404", {
      layout: false
    });
  }
});


router.get("/categories/delete/:id", (req, res, next) => {  
  var CatID=req.params.id;
  var retUrl = req.query.retUrl || "/managers/categories";
  if (res.locals.isAuthenticated && res.locals.is_admin) {
    categoryModel
      .remove_category(CatID)
      .then( res.redirect(retUrl) )
      .catch(next);
  } else {
    res.render("404", {
      layout: false
    });
  }
});


router.get("/category/add", (req, res, next) => {
  if (res.locals.isAuthenticated && res.locals.is_admin) {
    res.render("view_managers/vm_categories/m_category_add", {
      layout: "sbadmin_layout"
    });
  } else {
    res.render("404", {
      layout: false
    });
  }
});

router.post("/category/add", (req, res, next) => {
  console.log("post/category/add");
  console.log(req.body);

  var entity = {
    name: req.body.catname,
    slug_name: req.body.slug_name
  };

  console.log(entity);

  if (res.locals.isAuthenticated && res.locals.is_admin) {
    categoryModel
      .add(entity)
      .then(id => {
        res.render("view_managers/vm_categories/m_category_add", {
          layout: "sbadmin_layout",
          is_sesuccessful: true
        });
      })
      .catch(next);
  } else {
    res.render("404", {
      layout: false
    });
  }

  // res.render("view_managers/vm_categories/m_category_add", {
  //   layout: "sbadmin_layout"
  // });
});

router.get("/category/name-is-available", (req, res, next) => {
  var name = req.query.exist_name;
  console.log("category/name-is-available");
  console.log(name);
  categoryModel.singleBy("category", "name", name).then(rows => {
    if (rows.length > 0) {
      console.log("false");
      res.json(false);
    } else {
      console.log("true");
      res.json(true);
    }
  });
});

router.get("/category/slug_name-is-available", (req, res, next) => {
  var slug_name = req.query.exist_slug_name;
  console.log("category/slug_name-is-available");
  console.log(slug_name);
  categoryModel.singleBy("category", "slug_name", slug_name).then(rows => {
    if (rows.length > 0) {
      console.log("false");
      res.json(false);
    } else {
      console.log("true");
      res.json(true);
    }
  });
});

// ==================== SUBCATEGORIES ====================

router.get("/subcategories1", (req, res, next) => {
  if (res.locals.isAuthenticated && res.locals.is_admin) {
    // res.end("managers/subcategories1");

    categoryModel
      .allSubCategory_Dependent_Cat()
      .then(rows => {
        res.render("view_managers/vm_categories/m_subcategories1", {
          layout: "sbadmin_layout",
          subcategories1: rows
        });
      })
      .catch(next);
  } else {
    res.render("404", {
      layout: false
    });
  }

  // res.render("categories-post");
});

router.get("/subcategory1/add", (req, res, next) => {
  if (res.locals.isAuthenticated && res.locals.is_admin) {
    categoryModel
      .all()
      .then(rows => {
        res.render("view_managers/vm_categories/m_subcategory1_add", {
          layout: "sbadmin_layout",
          categories: rows
        });
      })
      .catch(next);
  } else {
    res.render("404", {
      layout: false
    });
  }
});

router.post("/subcategory1/add", (req, res, next) => {
  if (res.locals.isAuthenticated && res.locals.is_admin) {
    console.log("post/subcategory1/add");
    console.log(req.body);

    var entity = {
      table: "subcategory",
      name: req.body.subname,
      slug_name: req.body.slug_name,
      id_category: +req.body.chooseCat
    };

    console.log(entity);
    if (id_category >= 0) {
      categoryModel
        .add_Table(entity)
        .then(id => {
          res.render("view_managers/vm_categories/m_subcategory1_add", {
            layout: "sbadmin_layout",
            is_sesuccessful: true
          });
        })
        .catch(next);
    } else {
      res.render("view_managers/vm_categories/m_subcategory1_add", {
        layout: "sbadmin_layout",
        is_failure: true
      });
    }
  } else {
    res.render("404", {
      layout: false
    });
  }

  // res.render("view_managers/vm_categories/m_subcategory1_add", {
  //   layout: "sbadmin_layout"
  // });
});

router.get("/subcategory1/subname-is-available", (req, res, next) => {
  var subname = req.query.exist_subname;
  console.log("subcategory1/subname-is-available");
  console.log(subname);
  categoryModel.singleBy("subcategory", "name", subname).then(rows => {
    if (rows.length > 0) {
      console.log("false");
      res.json(false);
    } else {
      console.log("true");
      res.json(true);
    }
  });
});

router.get("/subcategory1/slug_name-is-available", (req, res, next) => {
  var slug_name = req.query.exist_slug_name;
  console.log("subcategory1/slug_name-is-available");
  console.log(slug_name);
  categoryModel.singleBy("subcategory", "slug_name", slug_name).then(rows => {
    if (rows.length > 0) {
      console.log("false");
      res.json(false);
    } else {
      console.log("true");
      res.json(true);
    }
  });
});

// ==================== ORTHERS ====================

router.get("/user_permission", (req, res) => {
  if (res.locals.isAuthenticated && res.locals.is_admin) {
    res.end("managers/user_permission");
  } else {
    res.render("404", {
      layout: false
    });
  }

  // res.render("categories-post");
});

router.get("/users", (req, res, next) => {
  if (res.locals.isAuthenticated && res.locals.is_admin) {
    userModel
      .allForView()
      .then(rows => {
        res.render("view_managers/vm_users/m_user", {
          layout: "sbadmin_layout",
          users: rows
        });
      })
      .catch(next);
  } else {
    res.render("404", {
      layout: false
    });
  }
  // res.end("managers/users")
});

router.get("/posts", (req, res) => {
  if (res.locals.isAuthenticated && res.locals.is_admin) {
    res.end("managers/posts");
  } else {
    res.render("404", {
      layout: false
    });
  }

  // res.render("categories-post");
});

router.get("/comments", (req, res) => {
  if (res.locals.isAuthenticated && res.locals.is_admin) {
    res.end("managers/comments");
  } else {
    res.render("404", {
      layout: false
    });
  }

  // res.render("categories-post");
});

router.get("/post_images", (req, res) => {
  if (res.locals.isAuthenticated && res.locals.is_admin) {
    res.end("managers/post_images");
  } else {
    res.render("404", {
      layout: false
    });
  }

  // res.render("categories-post");
});

router.get("/subscribers", (req, res) => {
  if (res.locals.isAuthenticated && res.locals.is_admin) {
    res.end("managers/subscribers");
  } else {
    res.render("404", {
      layout: false
    });
  }

  // res.render("categories-post");
});

router.get("/writers", (req, res, next) => {
  if (res.locals.isAuthenticated && res.locals.is_admin) {
    // res.end("managers/writers");
    userModel
      .allWriters()
      .then(rows => {
        res.render("view_managers/vm_users/m_writer", {
          layout: "sbadmin_layout",
          writers: rows
        });
      })
      .catch(next);
  } else {
    res.render("404", {
      layout: false
    });
  }

  // res.render("categories-post");
});

module.exports = router;