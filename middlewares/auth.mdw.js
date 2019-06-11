var postModel = require("../models/post.model");

module.exports = (req, res, next) => {
  if (req.user) {
    console.log("auth.mdw");
    res.locals.isAuthenticated = true;
    res.locals.authUser = req.user;
    console.log(res.locals.authUser);
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
          res.locals.writer_mdw =writer;
          console.log(res.locals.writer_mdw);
          next();
        })
        .catch(next);
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
