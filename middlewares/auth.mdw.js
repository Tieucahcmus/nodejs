module.exports = (req, res, next) => {
  if (req.user) {
    res.locals.isAuthenticated = true;
    res.locals.authUser = req.user;
    if (+res.locals.authUser.id_permission === 1) {
      res.locals.is_admin = true;
    } else if (+res.locals.authUser.id_permission === 2) {
      res.locals.is_editor = true;
    }
    else if (+res.locals.authUser.id_permission === 3) {
      res.locals.is_writer = true;
      
    }
    else if (+res.locals.authUser.id_permission === 4) {
      res.locals.is_subcriber = true;
    }

  }
  next();
};
