var express = require("express");
var exphbs = require("express-handlebars");
var hbs_sections = require("express-handlebars-sections");
var morgan = require("morgan");
var createError = require("http-errors");
var numeral = require("numeral");
var hbs_helpers = require("handlebars-helpers")();

var http = require("http");
var url = require("url");

var categoryModel = require("./models/categories.model");
var utils = require("./utils/utils");

var app = express();

// ==================== USE ====================

app.use(morgan("dev"));

app.engine(
  ".hbs",
  exphbs({
    extname: ".hbs",
    layoutsDir: "views/layouts",
    defaultLayout: "mainpost_layout",
    helpers: {
      format_number: val => {
        return numeral(val).format("0,0");
      },

      section: hbs_sections(),
      hbs_helpers: hbs_helpers
    }
  })
);
app.set("view engine", ".hbs");

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

// parse application/json
app.use(express.json());

//Serving static files in Express
app.use(express.static("public"));
//app.use(express.static(path.join(__dirname, '/public')));
// app.use(express.static("views"));

// ==================== MIDDLEWARES ====================
require("./middlewares/session.mdw")(app);
require("./middlewares/passport.mdw")(app);

// require("./middlewares/upload")(app);
app.use(require("./middlewares/post.mdw"));
app.use(require("./middlewares/auth.mdw"));

// ==================== ROUTES ====================
app.get("/", (req, res, next) => {
  // categoryModel
  //   .all()
  //   .then(rows => {
  //     // console.log(rows);
  //     categoryModel
  //       .allSubCategory1()
  //       .then(subs => {
  //         // console.log(subs);
  //         // console.log(res.locals.categories);
  //         res.render("view_posts/home", {
  //           post_categories: rows,
  //           post_subcategories: subs
  //         });
  //       })
  //       .catch(next);
  //   })
  //   .catch(next);
  // console.log(res.locals.post_categories);
  res.render("view_posts/home", {
    // post_categories: res.locals.post_categories
  });
});

app.use("/managers", require("./routes/managers.router"));

app.use("/users", require("./routes/users.router"));

app.use("/writers", require("./routes/writers.router"));

app.use("/posts", require("./routes/posts.router"));

app.get("/contact", (req, res, next) => {
  res.render("view_posts/contact");
});

app.get("/about", (req, res, next) => {
  res.render("view_posts/about");
});

app.get("/404", (req, res, next) => {
  res.render("404", {layout: false});
});

app.get("/error", (req, res, next) => {
  res.render("error", {layout: false});
});

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  var status = err.status || 500;
  var vwErr = "error";

  if (status === 404) {
    vwErr = "404";
  }

  // app.set('env', 'prod');
  // var isProd = app.get('env') === 'prod';

  process.env.NODE_ENV = process.env.NODE_ENV || "dev";
  var isProd = process.env.NODE_ENV === "prod";
  var message = isProd
    ? "An error has occured. Please contact administartor for more support."
    : err.message;
  var error = isProd ? {} : err;

  var message = isProd
    ? "An error has occured. Please contact administartor for more support."
    : err.message;
  var error = isProd ? {} : err;

  // console.log(message);
  // console.log(error);

  res.status(status).render(vwErr, {
    layout: false,
    message,
    error
  });
});

const hostname = "127.0.0.1";
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// =======
