var express = require("express");
var postModel = require("../models/post.model");
var categoryModel = require("../models/categories.model");
var router = express.Router();
var moment = require("moment");
var db = require("../utils/db");
var config = require('../config/default.json');
router.get("/", (req, res, next) => {
  var limit = config.paginate.default;
  var page = req.query.page || 1;
  if (page < 1) page = 1;
  var start_offset = (page - 1) * limit;

  if (res.locals.isAuthenticated && res.locals.is_writer) {
    var id=req.user.id;
    if(id == null){redirect("/")}
   
    postModel
    .AllPostbyId(id)
      .then((rows) => {
        var total = 0;
        if(rows !=null){total=rows.length}

        var nPages = Math.floor(total / limit);
        if (total % limit > 0) nPages++;

        var page_numbers = [];
        for (i = 1; i <= nPages; i++) {
          page_numbers.push({value: i}) }
        res.render("view_writers/index", {
          layout: "writer_layout",
          post: rows,
          count: total,
          page_numbers
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

//route này có thể đổi thành quyền admin or editor
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
    Promise.all([
      categoryModel.all(),
      postModel.single_writer(req.user.id),
      categoryModel.allSubCategory1(),
      db.loadAllExist("tag", 0)
    ])
      .then(([categories,writer,subcategories,tags]) => {
                res.render("view_writers/writing", {
                  layout: "writer_layout",
                  categories: categories,
                  subcategories: subcategories,
                  tags: tags,
                  writer:writer[0]['pseudonym']
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
  if (res.locals.isAuthenticated && res.locals.is_writer) {
    var Tags = new Array();

    db.loadAll('tag')
    .then(_tags=>{
      for(var i=0;i<_tags.length;i++)
      {
        var tag_temp = _tags[i]['id'];
        console.log(i+"=>"+tag_temp)
        if(req.body.tag_temp == 'on'){
          Tags.push(tag_temp);
        }
      }
    });

    console.log("Tags =>");
    console.log(Tags);
    var str_tag = "";
    if (Tags.length > 0) {
      for (var i = 0; i < tag.length; i++) {
        str_tag += tag[i];
        if (i != tag.length - 1) {
          str_tag += "_";
        }
      }
    }

    if (str_tag == "") {
      str_tag = "Tổng Hợp";
    }

    var entity = {
      title: req.body.title,
      slug_title: req.body.slug,
      summary: req.body.summary,
      id_category: req.body.category,
      content: req.body.content,
      id_user: req.body.writer_id,
      pseudonym: req.body.writer_name,
      post_date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      last_update: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    };

    console.log(entity);

    if (req.body.category == 0) {
      res.redirect("/writers");
    } else {
      postModel
        .addPost(entity)
        .then(id => {
          res.redirect("/writers");
        })
        .catch(next);
    }
  } else {
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
