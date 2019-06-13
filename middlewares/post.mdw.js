var categoryModel = require("../models/categories.model");
var url = require("url");
module.exports = (req, res, next) => {
  console.log("req.post.mdw");
  // console.log(url.parse(req.url));
  pathname = url.parse(req.url).pathname;
  var split_pathname = pathname.split("/");
  console.log(pathname);
  console.log(split_pathname);

  //nếu là trang chủ hoặc nếu là các trang /posts/?
  if (pathname == "/" || split_pathname[1] == "posts" || split_pathname[1] == "writers") {
    //thì load categories lên res.locals
    categoryModel
      .all()
      .then(categories => {
        categoryModel
          .allSubCategory1()
          .then(subcategories => {
            res.locals.post_categories_mdw = categories;
            res.locals.post_subcategories_mdw = subcategories;
            // console.log(res.locals.post_categories_mdw);
            next();
          })
          .catch(next);
      })
      .catch(next);
  } else {
    console.log("!pathname");
    next();
  }
};
