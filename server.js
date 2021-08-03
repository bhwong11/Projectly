/* SECTION: External modules */
const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo");

/* SECTION: Internal modules */
const { auth, boards, tasks } = require("./controllers/index");


/* SECTION: Instanced modules */
const app = express();

/* SECTION: Configure App  */
const PORT = 4000;

//NOTE: we can now view the session with req.session
app.use(
    session({
      store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // two weeks
      },
    })
);

/* SECTION: Middleware */
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(function (req, res, next) {
  res.locals.user = req.session.currentUser;
  next();
});

const authRequired = function (req, res, next) {
  if(req.session.currentUser){
    return next();
  }
  return res.redirect("/login");
}

const checkAuth = function (req, res, next) {
  if(req.path != "/logout"){
    if(req.path==='/login' || req.path==='/register'){
    if(req.session.currentUser){
      return res.redirect("/boards")
    }
  }
  }
  
  return next();
}

/* SECTION: Connect to controllers & routes */
app.get("/", (req, res, next) => {
  return res.redirect("/login");
});

app.use("/boards", authRequired, boards);
app.use("/tasks",authRequired,tasks)
app.use("/",checkAuth,  auth);

app.get("/*", (req, res, next) => {
  const context = {
    error: req.error,
  }
  return res.render("404",context);
});

/* SECTION: Server bind */
app.listen(PORT, () => {
    console.log(`App bound and listening on port: ${PORT}`);
});