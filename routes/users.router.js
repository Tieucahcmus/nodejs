var express = require("express");
var bcrypt = require("bcrypt");
var moment = require("moment");
var passport = require("passport");
var userModel = require("../models/user.model");
var postModel = require("../models/post.model");
var restricted = require("../middlewares/restricted.mdw");

var router = express.Router();

router.get("/register", (req, res, next) => {
  res.render("view_users/register", {
    layout: false
  });
});

router.post("/register", (req, res, next) => {
  var saltRounds = 12;
  var hash = bcrypt.hashSync(req.body.t_password, saltRounds);
  var dob = moment(req.body.dob, "DD/MM/YYYY").format("YYYY-MM-DD");

  // console.log(hash);
  // console.log(dob);

  var entity = req.body;
  entity.password = hash;
  entity.date_of_birth = dob;
  // entity.id_permission = 0;
  // console.log(entity);
  delete entity.t_password;
  delete entity.confirm;
  delete entity.dob;

  // console.log(Date.now());

  var dateNow = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

  var dnow = new Date();
  dnow.setDate(dnow.getDate() + 7);
  console.log(dnow);
  var expirationDate = moment(dnow).format("YYYY-MM-DD HH:mm:ss");
  // console.log(expirationDate);

  var insertData = {
    username: entity.username,
    password: entity.password,
    displayname: entity.displayname,
    created_date: dateNow,
    email: entity.email,
    date_of_birth: dob
  };

  // console.log(insertData);

  //insert new user
  userModel.add(insertData).then(idUser => {
    // console.log("idUser" + idUser);
    var Subscriber = {
      id_user: idUser,
      expiration_date: expirationDate
    };
    // console.log(Subscriber);
    //insert new Subscriber
    userModel.addSubscriber(Subscriber).then(idUser => {
      res.redirect("/users/login");
    });
  });
  // res.end("post");
  // res.redirect("/users/register");
});

router.get("/is-available", (req, res, next) => {
  var user = req.query.user;
  userModel.singleByUserName(user).then(rows => {
    if (rows.length > 0) res.json(false);
    else res.json(true);
  });
});

router.get("/login", (req, res, next) => {
  res.render("view_users/login", {
    layout: false
  });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.render("view_users/login", {
        layout: false,
        err_message: info.message
      });
    }
    var retUrl = req.query.retUrl || "/";
    req.logIn(user, err => {
      if (err) return next(err);
      return res.redirect(retUrl);
    });
  })(req, res, next);
});

router.post("/logout", restricted, (req, res, next) => {
  req.logout();
  res.redirect("/");
});

router.get("/profile", restricted, (req, res, next) => {
  userModel
      .single(req.user.id)
      .then(rows => {
        res.render("view_users/edit-profile", {
          info: rows[0],
          pseudonym: res.locals.writer_mdw[0]['pseudonym']
        });
      })
      .catch(next);
  });

  //read single post
  router.get("/read/:tag/:id/:slug_title", (req, res, next) => {
    postModel
    .getSiglePostAndComment(req.params.id)
    .then(rows=>{
      res.render("view_posts/single-post", {
      post: rows[0],
      tag: req.params.tag,
      info: req.user,
      count : rows.length,
      comment: rows
    },console.log(rows[0])
    );
  });
});

//comment single post

router.post("/read/:tag/:id/:slug_title", (req, res, next) => {

  var entity ={
    displayname :req.body.displayname,
    comment_content :req.body.content,
    comment_date :  moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    last_update :  moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    id_post: req.params.id
  };
console.log(entity);
  var retUrl = req.query.retUrl || "/users/read/"+req.params.tag+"/"+req.params.id+"/"+req.params.slug_title;
  postModel.addComment(entity)
  .then(id=>{
    res.redirect(retUrl)
  })
  .catch(next)
});


module.exports = router;
