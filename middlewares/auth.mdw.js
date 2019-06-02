module.exports = (req, res, next) => {
  if (req.user) {
    res.locals.isAuthenticated = true;
    res.locals.authUser = req.user;
    console.log("auth.mdx");
    console.log(res.locals.authUser);
    console.log(res.locals.authUser.id_permission);
    if (+res.locals.authUser.id_permission === 1) {
      console.log("admin");
      res.locals.is_admin = true;
    } else if (+res.locals.authUser.id_permission === 2) {
      console.log("editor");
      res.locals.is_editor = true;
    }
    else if (+res.locals.authUser.id_permission === 3) {
      console.log("writer");
      res.locals.is_writer = true;
    }
    else if (+res.locals.authUser.id_permission === 4) {
      console.log("subcriber");
      res.locals.is_subcriber = true;
    }

  }
  next();
};
