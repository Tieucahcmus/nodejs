var express = require("express");
var exphbs = require("express-handlebars");
var hbs_sections = require("express-handlebars-sections");
var morgan = require("morgan");
var createError = require("http-errors");
var numeral = require("numeral");

var app = express();

// ==================== USE ====================

app.use(morgan("dev"));

app.engine(
  ".hbs",
  exphbs({
    extname: ".hbs",
    layoutsDir: "views/layouts",
    defaultLayout: "mainpost",
    helpers: {
      format_number: val => {
        return numeral(val).format("0,0");
      },
      section: hbs_sections()
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
require("./middlewares/session")(app);
require("./middlewares/passport")(app);
// require("./middlewares/upload")(app);

app.use(require("./middlewares/auth.mdw"));

// ==================== ROUTES ====================
app.get("/", (req, res) =>
  // res.end('Hello World!')
  res.render("view_posts/home")
);

app.use("/posts", require("./routes/posts.router"));

app.use("/managers", require("./routes/managers.router"));

app.use("/users", require("./routes/users.router"));

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/404", (req, res) => {
  res.render("404", {layout: false});
});

app.get("/error", (req, res) => {
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
