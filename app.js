const express = require("express");
const app = express();
const session = require('express-session');
const bodyParser = require("body-parser");
const exphbs = require('express-handlebars')
const cookieparser = require('cookie-parser');
const { auth } = require('express-openid-connect');
const fileUpload = require('express-fileupload');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: '57CV9j68xKE9q7cSshjuk5sc2kGRWdvL',
  issuerBaseURL: 'https://dev-gfg610xw.us.auth0.com'
};


const static = express.static(__dirname + "/public");

const configRoutes = require("./routes");
app.use(fileUpload({
  createParentPath: true
}));
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
app.use("/public", static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  name: 'AuthCookie',
  secret: 'gfhjfgrfbvjnjrfj',
  resave: false,
  saveUninitialized: true
}));


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/callback", async (req, res) => {
  res.redirect("/");
});

app.post("/callback", async (req, res) => {
  res.redirect("/");
});
configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
