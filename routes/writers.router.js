var express = require("express");
var postModel = require("../models/post.model");
var categoryModel = require("../models/categories.model");
var router = express.Router();

router.get("/", (req, res, next) => {
  if (res.locals.isAuthenticated && res.locals.is_writer) {
    postModel
      .AllPostbyId(req.user.id)
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
  res.end("edit"+req.params.id);
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
  var tag = new Array();

  if(req.body.tagKT == 'on')
  { tag.push('Kinh Tế'); }

  if(req.body.tagCT == 'on')
  { tag.push('Chính Trị'); }

  if(req.body.tagXH == 'on')
  { tag.push('Xã Hội'); }

  if(req.body.tagTG == 'on')
  { tag.push('Thế Giới'); }

  if(req.body.tagCN == 'on')
  { tag.push('Công Nghệ'); }

  if(req.body.tagDA == 'on')
  { tag.push('Điện Ảnh'); }

  if(req.body.tagPL == 'on')
  { tag.push('Pháp Luật'); }

  if(req.body.tagGD == 'on')
  { tag.push('Giáo Dục'); }

  var str_tag ="";
  if(tag.length > 0)
  {
    for(var i=0;i<tag.length;i++ )
    {
      str_tag +=tag[i];
      if(i!=tag.length-1){
        str_tag +=",";
      }
    }
  }
  const entity = {
    title: req.body.title,
    slug_title: req.body.slug,
    summary: req.body.summary,
    id_category: req.body.category,
    content: req.body.content,
    id_user: req.body.writer_id,
    pseudonym:res.locals.writer_mdw[0]['pseudonym'],
    tag : str_tag
  };

  if(req.body.category == 0){
    res.redirect("/writers/writing");
  }else{
  if (res.locals.isAuthenticated && res.locals.is_writer) {
    postModel
      .addPost(entity)
      .then(id => {
        res.render("view_writers/index", {
          layout: "writer_layout"
        });
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
