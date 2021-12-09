const characterRoute = require("./anime");
const searchRoute = require("./search");
const homeRoute = require("./home");
const userRoute = require("./users");
const reviewRoute = require("./reviews");
const commentRoutes = require("./comments");
const adminRoutes = require('./admin');

const constructerMethod = (app) => {
  app.use("/", homeRoute);
  app.use("/search", searchRoute);
  app.use("/anime", characterRoute);
  app.use("/users", userRoute);
  app.use("/reviews", reviewRoute);
  app.use("/comments", commentRoutes);
  app.use("/admin", adminRoutes);

  app.use("*", (req, res) => {
    //res.redirect("/");  
    const animeData = {
      error: "Route not found",
      isAdmin: req.session.user && req.session.user.username.includes("admin") ? true : false,
      isUserLoggedIn: req.session.user != null ? true : false
    };
    res.status(404);
    res.render("anime/error", animeData);
  });
};

module.exports = constructerMethod;