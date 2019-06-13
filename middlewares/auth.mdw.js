var postModel = require("../models/post.model");
var categoryModel =require("../models/categories.model");
module.exports = (req, res, next) => {
  if (req.user) {
    res.locals.isAuthenticated = true;
    res.locals.authUser = req.user;

    if (+res.locals.authUser.id_permission === 1) 
    {
      res.locals.is_admin = true;
    } 
    else if (+res.locals.authUser.id_permission === 2) 
    {
      res.locals.is_editor = true;
    } 
    else if (+res.locals.authUser.id_permission === 3) 
    {
      res.locals.is_writer = true;
     
      postModel
        .single_writer(req.user.id)
        .then(writer => {
          res.locals.writer_mdw = writer;
          next();
        })
        .catch(next);

        // categoryModel
        // .all()
        // .then(rows => {
        //   res.locals.category_mdw = rows;
        //   next();
        // })
        // .catch(next);
    } 
    else if (+res.locals.authUser.id_permission === 4) 
    {
      res.locals.is_subcriber = true;
    }

  }else
  {
    next();
  }
};
