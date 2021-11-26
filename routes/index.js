const characterRoute = require("./anime");
const searchRoute = require("./search");
const homeRoute = require("./home");

const constructerMethod = (app) => {
  app.use("/", homeRoute);
  app.use("/search", searchRoute);
  app.use("/anime", characterRoute);

  app.use("*", (req, res) => {
    //res.redirect("/");
    const animeData = {
      error: "Route not found",
    };
    res.status(404);
    res.render("anime/error", animeData);
  });
};

module.exports = constructerMethod;
