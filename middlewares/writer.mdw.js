var categoryModel = require("../models/categories.model");
var url = require("url");
module.exports = (req, res, next) => {
  console.log("req.post.mdw");
  // console.log(url.parse(req.url));
  pathname = url.parse(req.url).pathname;
  var segment = pathname.split("/");
  console.log(pathname);
  console.log(segment);
  console.log(res.locals.writer_mdw[0]["id_user"]);
  //nếu là trang chủ hoặc nếu là các trang /posts/?
  if (
    segment[1] == "writers" 
  ) {
    //thì load categories lên res.locals
    Promise.all([categoryModel.all(), 
      categoryModel.allSubCategory1(),
      db.load(`
      select count(*) as countPublished
      from post 
      where post.status = 2 and post.id_user = '${res.locals.writer_mdw[0]["id_user"]}' and
      post.is_delete = 0
    `)
    
    ])
      .then(([categories, subcategories, count]) => {
        res.locals.post_categories_mdw = categories;
        res.locals.post_subcategories_mdw = subcategories;
        res.locals.countPublished_mdw = count[0].countPublished;
        console.log(res.locals.countPublished_mdw);
        // console.log(categories);
        // console.log(subcategories);
        next();
      })
      .catch(next);
  } else {
    console.log("!pathname");
    next();
  }
};
