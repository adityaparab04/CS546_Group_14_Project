const express = require("express");
// const session = require("express-session");
const router = express.Router();
const data = require("../data");
const xss = require("xss");
const bcrypt = require('bcryptjs');
const userFetch = data.users;
const animeCollection = data.anime;
const reviewCollection = data.reviews;
const commentsCollection = data.comments;

function validateEmail(email) {
    const regexEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
    if (email.match(regexEmail)) {
        return true;
    }
    else {
        return false;
    }
}

// Function to check if user is validated
const checkLog = function (req) {
    if (req.session != undefined) {
        return !!req.session.user;
    } else {
        return false;
    }
};
//Check if username and password entered are correct
var checkvalid = async function (req) {
    const username = xss(req.body.username.toLowerCase().trim());
    const password = xss(req.body.password);
    if (!username) throw "You must provide a User Name"
    if (username == undefined) throw "User Name not defined"
    if (username == null || username.length == 0) throw "User Name cannot be null"
    if (username.length < 5 || username.length > 25) throw "Enter a User Name with more than 4 and less than 15 characters"
    if (!username.match(/^[a-z0-9_@\.]+$/)) throw "Enter a User Name only with valid characters"

    if (!password) throw "You must provide a password"
    if (password == null || password.length == 0) throw "Password cannot be null"
    if (password === undefined) throw "password not defined"
    if (password.length < 6 || password.length > 20) throw "enter a password with more than 6 characters or less than 20"
    if (!password.match(/^(?!\s*$).+/)) throw "Enter a valid password"

    const getuser = await userFetch.getAllUsers();
    for (var i = 0; i < getuser.length; i++) {
        if ((getuser[i].username == username) && bcrypt.compareSync(password, getuser[i].password)) {
            return getuser[i];
        }
    }
    return false;
};
// Get login page
router.get('/login', function (req, res) {
    if (req.session.user) {
        res.redirect('/');
    }
    else {
        res.render('users/login', { title: "Login", msg: req.query.msg, isAdmin: req.session.user && req.session.user.username.includes("admin") ? true : false, isUserLoggedIn: req.session.user != null ? true : false });
    }
})

// Get signup page
router.get('/signup', function (req, res, next) {
    if (checkLog(req)) {
        res.redirect('/');
    }
    else {
        res.render('users/signup', { title: "SignUp", isAdmin: req.session.user && req.session.user.username.includes("admin") ? true : false, isUserLoggedIn: req.session.user != null ? true : false })
    }
})

router.post('/signup', async function (req, res) {
    const username = xss(req.body.username.toLowerCase().trim());
    const password = xss(req.body.password);
    const age = Number(xss(req.body.age));
    const email = xss(req.body.email);
    let errorMessage = null;
    if (!username) {
        errorMessage = "Username must be present";
    }
    else if (username == null) {
        errorMessage = "Username cannot be null";
    }
    else if (username == undefined) {
        errorMessage = "username not defined";
    }
    else if (username.length < 5 || username.length > 25) {
        errorMessage = "Enter a User Name with more than 4 and less than 15 characters";
    }
    else if (!username.match(/^[a-z0-9_@\.]+$/)) {
        errorMessage = "Enter a User Name only with valid characters";
    }
    else if (!password) {
        errorMessage = "You must provide a password post";
    }
    else if (password == null) {
        errorMessage = "password cannot be null";
    }
    else if (password == undefined) {
        errorMessage = "password not defined";
    }
    else if (password.length < 6 || password.length > 20) {
        errorMessage = "Enter a password with more than 6 and less than 20 characters";
    }
    else if (!password.match(/^(?!\s*$).+/)) {
        errorMessage = "Enter password only with valid characters";
    }
    else if (!email) {
        errorMessage = "You must provide a email post";
    }
    else if (email == null || email.length == 0) {
        errorMessage = "email cannot be null";
    }
    else if (email == undefined) {
        errorMessage = "email not defined";
    }
    else if (!validateEmail(email)) {
        errorMessage = "Enter email only with valid characters";
    }
    else if (!age || age == null || age == undefined) {
        errorMessage = "Invalid age parameters";
    }
    else if (typeof age == 'string') {
        errorMessage = "Age should be a number";
    }
    else if (age < 1 || age > 100) {
        errorMessage = "Invalid age";
    }
    else {
        errorMessage = null;
    }
    try {
        if (errorMessage == null) {
            const usercheck = await userFetch.checkUser(username, password, email);
            if (usercheck) {
                errorMessage = "User already exists";
            }
        }
    }
    catch (e) {
        errorMessage = e;
    }
    try {
        if (errorMessage == null) {
            if (!req.files) {
                const adduser = await userFetch.createUser(req.body.username, age, req.body.password, req.body.email, `/public/images/profile_pic.jpeg`);
                return res.redirect('/users/login?msg=Congratulations, you are user now');
            } else {
                let picture = req.files.picture;
                //picture.mv(`./public/pics/${username}_` + picture.name);
                picture.mv(`./public/pics/` + picture.name);
                //const adduser = await userFetch.createUser(req.body.username, age, req.body.password, req.body.email,`/public/pics/${username}_` + picture.name);
                const adduser = await userFetch.createUser(req.body.username, age, req.body.password, req.body.email, `/public/pics/` + picture.name);
                
                return res.redirect('/users/login?msg=Congratulations, you are user now');
            }
        }
    } catch (e) {
        errorMessage = e;
    }
    //console.log(errorMessage);

    res.render('users/signup', { title: "Error", error: errorMessage, isAdmin: req.session.user && req.session.user.username.includes("admin") ? true : false, isUserLoggedIn: req.session.user != null ? true : false })
});

router.post('/login', async function (req, res) {
    const username = xss(req.body.username.toLowerCase().trim());
    const password = xss(req.body.password);
    let errorMessage = null;
    if (!username) {
        errorMessage = "Username must be present";
    }
    else if (username == null) {
        errorMessage = "Username cannot be null";
    }
    else if (username == undefined) {
        errorMessage = "username not defined";
    }
    else if (username.length < 5 || username.length > 25) {
        errorMessage = "Enter a User Name with more than 4 and less than 15 characters";
    }
    else if (!username.match(/^[a-z0-9_@\.]+$/)) {
        errorMessage = "Enter a User Name only with valid characters";
    }
    else if (!password) {
        errorMessage = "You must provide a password post";
    }
    else if (password == null) {
        errorMessage = "password cannot be null";
    }
    else if (password == undefined) {
        errorMessage = "password not defined";
    }
    else if (password.length < 6 || username.length > 20) {
        errorMessage = "Enter a password with more than 4 and less than 15 characters";
    }
    else if (!password.match(/^(?!\s*$).+/)) {
        errorMessage = "Enter password only with valid characters";
    }
    else {
        errorMessage = null;
    }
    if (errorMessage == null) {
        const user = await checkvalid(req);
        //console.log(user)
        if (user) {
            req.session.user = user;
            return res.send({ status: true, error: null });
        }
        errorMessage = "Invalid username/password";
    }
    res.send({ status: false, error: errorMessage });
});

router.get('/profile', async function (req, res) {
    if (req.session.user) {
        let favs = [];
        let anime = await animeCollection.getAllAmineFromDB();
        if (anime && anime.length > 0) {
            for (let an of anime) {
                if (an.favUserArr.includes(req.session.user._id.toString())) {
                    favs.push(an);
                }
            }
        }
        let reviews = await reviewCollection.getAllReviewsOfAUser(req.session.user._id.toString());
        for (let r of reviews) {
            r.user = await userFetch.getUserById(r.userId);
            r.noOfLikes = r.likeCount.length;
            r.noOfDislikes = r.dislikeCount.length;
        }
        let comments = await commentsCollection.getAllCommentsOfAUser(req.session.user._id.toString());
        for (let c of comments) {
            c.user = await userFetch.getUserById(c.userId);
        }
        if (favs.length == 0) {
            favs = null;
        }
        res.render('users/profileprivate', { title: "Information", favs: favs, user: req.session.user, isAdmin: req.session.user && req.session.user.username.includes("admin") ? true : false, isUserLoggedIn: req.session.user != null ? true : false, reviews: reviews, comments })
    }
    else {
        res.redirect('/users/login?msg=Please sign in to view your profile');
    }
});

router.get('/remove_profile', async function (req, res) {
    if (req.session.user) {
        await userFetch.deleteUser(req.session.user._id);
        req.session.destroy();
        res.redirect('/users/logout');
    }
    else {
        res.redirect('/users/login?msg=Please sign in to delete your account');
    }
});

router.get('/update_profile', function (req, res) {
    if (req.session.user) {
        res.render('users/updateProfile', { title: "Update Profile", user: req.session.user, isAdmin: req.session.user && req.session.user.username.includes("admin") ? true : false, isUserLoggedIn: req.session.user != null ? true : false })
    }
    else {
        res.redirect('/users/login?msg=Please sign in to update your profile');
    }
});

router.post('/update_profile', async function (req, res) {
    const password = xss(req.body.password);
    const age = Number(xss(req.body.age));
    const email = xss(req.body.email);
    let errorMessage = null;
    if (password && password.length < 6 || password.length > 20) {
        errorMessage = "Enter a password with more than 6 and less than 20 characters";
    }
    else if (password && !password.match(/^(?!\s*$).+/)) {
        errorMessage = "Enter password only with valid characters";
    }
    else if (!email) {
        errorMessage = "You must provide a email post";
    }
    else if (email == null || email.length == 0) {
        errorMessage = "email cannot be null";
    }
    else if (email == undefined) {
        errorMessage = "email not defined";
    }
    else if (!validateEmail(email)) {
        errorMessage = "Enter email only with valid characters";
    }
    else if (!age || age == null || age == undefined) {
        errorMessage = "Invalid age parameters";
    }
    else if (age < 1 || age > 100) {
        errorMessage = "Invalid age";
    }
    else {
        errorMessage = null;
    }

    try {
        if (errorMessage == null) {
            let updatedUser = { email, age };
            if (password) {
                updatedUser.password = password;
            }
            const updateuser = await userFetch.updateUser(req.body.id, updatedUser);
            if (updatedUser) {
                let sessionUser = req.session.user;
                for (let key in updatedUser) {
                    sessionUser[key] = updatedUser[key];
                }
                req.session.user = sessionUser;
                return res.redirect('/users/profile');
            }
        }
    } catch (e) {
        errorMessage = e;
    }
    //console.log(errorMessage);
    res.render('/users/updateProfile', { title: "Error", error: errorMessage, user: req.session.user, isAdmin: req.session.user && req.session.user.username.includes("admin") ? true : false, isUserLoggedIn: req.session.user != null ? true : false })

});

router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/logout');
});

router.get("/profile/:reviewId", async (req, res) => {
    if (!req.session.user) {
        return res.redirect("/users/login?msg=Please login first.");
    }
    if(!req.params.reviewId || typeof req.params.reviewId !== 'string' || !req.params.reviewId.replace(/\s/g, "").length) throw `invalid reviewId`;
    await reviewCollection.removeReview(req.params.reviewId);
    res.redirect("/users/profile");
});
router.get("/profile/delete/:reviewId/:commentId", async (req, res) => {
    if (!req.session.user) {
        return res.redirect("/users/login?msg=Please login first.");
    }
    if(!req.params.reviewId || typeof req.params.reviewId !== 'string' || !req.params.reviewId.replace(/\s/g, "").length) throw `invalid reviewId`;
    if(!req.params.commentId || typeof req.params.commentId !== 'string' || !req.params.commentId.replace(/\s/g, "").length) throw `invalid commentId`;
    
    await commentsCollection.removeComments(req.params.reviewId, req.params.commentId);
    res.redirect("/users/profile");
});



module.exports = router;