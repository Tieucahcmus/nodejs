var express = require("express");
var postModel = require("../models/post.model");
var categoryModel = require("../models/categories.model");
var router = express.Router();
var moment = require("moment");
var db = require("../utils/db");
var multer = require("multer");
var config = require('../config/default.json');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/img/post/uploads");
  },

  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({
  storage: storage
});

router.get("/", (req, res, next) => {
  if (res.locals.isAuthenticated && res.locals.is_writer) {
    var limit = config.paginate.default;
    var page = req.query.page || 1;
    if (page < 1) page = 1;
    var start_offset = (page - 1) * limit;
    var preButton = 1;
    var nextButton = 2;
    Promise.all([
      postModel.pageById(req.user.id,start_offset),
      postModel.singleBy('id_user',req.user.id),
      postModel.countPostWithStt('status','2',req.user.id)
    ])
      .then(([rows,nrows,countPosted]) => {
        var total = nrows.length;
        var nPages = Math.floor(total / limit);
        if (total % limit > 0)
          nPages++;

        var arr = new Array();
        for(var i=1 ;i <=nPages;i++)
        {
          arr.push({value: i});
        }

        if(page <= 1)
          preButton = 0;
        else
          preButton = +page - 1;

        if(page < nPages )
          nextButton = +page + 1;
        else
          nextButton = 0;

        res.render("view_writers/index", {
          layout: "writer_layout",
          post: rows,
          count: total,
          page_numbers:arr,
          preButton,
          nextButton,
          postedCount: countPosted[0]['count(*)']
        });
      })
      .catch(next);
  } else {
    res.render("404", {
      layout: false
    });
  }
});

router.get("/delete/:id", (req, res, next) => {
  var retUrl = req.query.retUrl || "/writers";
  if (res.locals.isAuthenticated && res.locals.is_writer) {
    postModel
      .remove(req.params.id)
      .then(res.redirect(retUrl))
      .catch(next);
  } else {
    res.render("404", {
      layout: false
    });
  }
});

router.get("/edit/:id", (req, res, next) => {
  if (res.locals.isAuthenticated && res.locals.is_writer) {
    categoryModel
      .singleBy("post", "id", req.params.id)
      .then(rows => {
        res.render("view_writers/edit", {
          layout: "writer_layout",
          post: rows[0],
          category: res.locals.post_categories_mdw
        });
      })
      .catch(next);
  } else {
    res.render("404", {
      layout: false
    });
  }
});

//route này có thể đổi thành quyền admin or 
router.get("/backup/:id", (req, res, next) => {
  var retUrl = req.query.retUrl || "/writers";
  if (res.locals.isAuthenticated && res.locals.is_writer) {
    postModel
      .backup(req.params.id)
      .then(res.redirect(retUrl))
      .catch(next);
  } else {
    res.render("404", {
      layout: false
    });
  }
});

router.get("/writing", (req, res, next) => {
  if (res.locals.isAuthenticated && res.locals.is_writer) {
    db.loadAllExist("tag", 0)
      .then(tags => {
        res.render("view_writers/writing", {
          layout: "writer_layout",
          categories: res.locals.post_categories_mdw,
          subcategories: res.locals.post_subcategories_mdw,
          tags: tags
        });
      })
      .catch(next);
  } //
  else {
    res.render("404", {
      layout: false
    });
  }
});

router.get("/writing/subcat-is-available", (req, res, next) => {
  var id_cat = req.query.id_cat;
  var id_subcat = req.query.id_subcat;

  console.log("/writing/subcat-is-available");
  console.log(id_cat + " - " + id_subcat);

  //subcategory có thể null
  if (id_subcat == 0) {
    console.log("true");
    res.json(true);
  } //
  else {
    categoryModel
      .isSubcategoryDependentCategory(id_subcat, id_cat)
      .then(rows => {
        if (rows.length <= 0) {
          console.log("false");
          res.json(false);
        } else {
          console.log("true");
          res.json(true);
        }
      });
  }
});

router.post("/writing", upload.array("fuMain", 2), (req, res, next) => {
  if (res.locals.isAuthenticated && res.locals.is_writer) {

    var TagArr = [];
    


    var entity = {
      title: req.body.title,
      slug_title: req.body.slug,
      post_date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      last_update: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      id_user: req.body.writer_id,
      pseudonym: res.locals.writer_mdw[0]["pseudonym"],
      views: 0,
      id_category: req.body.category,
      id_subcategory: req.body.subcategory,
      content: req.body.content,
      summary: req.body.summary
    };

    console.log(entity);
    //kiểm tra id_category của subcategory có hợp lệ với category
    //vì trên giao diện chưa fix đc
    categoryModel
      .isSubcategoryDependentCategory(entity.id_subcategory, entity.id_category)
      .then(rows => {
        if (rows.length >= 0) {
           //kiểm tra slug_title để ko thêm trùng (bước kiểm tra cuối cùng)
           //tránh tình trạng vì 1 lý do nào đó ấn post nhiều lần
          //add post
          Promise.all([
            postModel.addPost(entity),
            db.loadAllExist("tag", 0)
          ])
            .then(([rows,tags]) => {
               res.render("view_writers/writing", {
                    layout: "writer_layout",
                    categories: res.locals.post_categories_mdw,
                    subcategories: res.locals.post_subcategories_mdw,
                    tags: tags
                  });
                })
                .catch(next);
        } //
        else {
          db.loadAllExist("tag", 0)
            .then(tags => {
              res.render("view_writers/writing", {
                layout: "writer_layout",
                categories: res.locals.post_categories_mdw,
                subcategories: res.locals.post_subcategories_mdw,
                tags: tags
              });
            })
            .catch(next);
        }
      })
      .catch(next);

    // if (req.body.category == 0) {
    //   res.redirect("/writers");
    // } else {
    //   postModel
    //     .addPost(entity)
    //     .then(id => {
    //       res.redirect("/writers");
    //     })
    //     .catch(next);
    // }
  } //
  else {
    res.render("404", {
      layout: false
    });
  }
});

router.post("/edit/:id", (req, res, next) => {
  var tag = new Array();
  if (req.body.tagKT == "on") {
    tag.push("Kinh Tế");
  }

  if (req.body.tagCT == "on") {
    tag.push("Chính Trị");
  }

  if (req.body.tagXH == "on") {
    tag.push("Xã Hội");
  }

  if (req.body.tagTG == "on") {
    tag.push("Thế Giới");
  }

  if (req.body.tagCN == "on") {
    tag.push("Công Nghệ");
  }

  if (req.body.tagDA == "on") {
    tag.push("Điện Ảnh");
  }

  if (req.body.tagPL == "on") {
    tag.push("Pháp Luật");
  }

  if (req.body.tagGD == "on") {
    tag.push("Giáo Dục");
  }

  var str_tag = "";
  if (tag.length > 0) {
    for (var i = 0; i < tag.length; i++) {
      str_tag += tag[i];
      if (i != tag.length - 1) {
        str_tag += "_";
      }
    }
  }
  const entity = {
    id: req.params.id,
    title: req.body.title,
    slug_title: req.body.slug,
    summary: req.body.summary,
    id_category: req.body.category,
    content: req.body.content,
    id_user: res.locals.writer_mdw[0]["id_user"],
    pseudonym: res.locals.writer_mdw[0]["pseudonym"],
    tag: str_tag,
    last_update: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
  };
  console.log(entity);
  if (req.body.category == 0) {
    res.redirect("/writers/edit/" + res.params.id);
  } else {
    if (res.locals.isAuthenticated && res.locals.is_writer) {
      postModel
        .update(entity)
        .then(id => {
          res.redirect("/writers");
        })
        .catch(next);
    } else {
      res.render("404", {
        layout: false
      });
    }
  }
});

module.exports = router;
