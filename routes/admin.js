const express = require("express");
const router = express.Router();
const data = require("../data");
const usersCollection = data.users;
const reviewCollection = data.reviews;
const commentsCollection = data.comments;

router.get("/", async (req, res) => {
    if (!req.session.user) {
        return res.redirect("/users/login?msg=Please login first.");
    }
    let users = await usersCollection.getAllUsers();
    res.render("admin/index", { isUserLoggedIn: req.session.user != null ? true : false, isAdmin: req.session.user && req.session.user.username.includes("admin") ? true : false, title: "Admin: Manage Users", users: users });
});

router.get("/reviews", async (req, res) => {
    if (!req.session.user) {
        return res.redirect("/users/login?msg=Please login first.");
    }
    let reviews = await reviewCollection.getAllReviews();
    for (let r of reviews) {
        r.user = await usersCollection.getUserById(r.userId);
        r.noOfLikes = r.likeCount.length;
        r.noOfDislikes = r.dislikeCount.length;
    }
    res.render("admin/reviews", { isUserLoggedIn: req.session.user != null ? true : false, isAdmin: req.session.user && req.session.user.username.includes("admin") ? true : false, title: "Admin: Manage Reviews", reviews: reviews });
});

router.get("/reviews/:userId", async (req, res) => {
    if (!req.session.user) {
        return res.redirect("/users/login?msg=Please login first.");
    }
    if (!req.params.userId || typeof req.params.userId !== 'string' || !req.params.userId.replace(/\s/g, "").length)
        throw `Enter a valid user Id`
    let reviews = await reviewCollection.getAllReviewsOfAUser(req.params.userId);
    for (let r of reviews) {
        r.user = await usersCollection.getUserById(r.userId);
        r.noOfLikes = r.likeCount.length;
        r.noOfDislikes = r.dislikeCount.length;
    }
    res.render("admin/reviews", { isUserLoggedIn: req.session.user != null ? true : false, isAdmin: req.session.user && req.session.user.username.includes("admin") ? true : false, title: "Admin: Manage Reviews", reviews: reviews });
});

router.get("/comments", async (req, res) => {
    if (!req.session.user) {
        return res.redirect("/users/login?msg=Please login first.");
    }
    let comments = await commentsCollection.getAllComments();
    for (let c of comments) {
        c.user = await usersCollection.getUserById(c.userId);
    }
    res.render("admin/comments", { isUserLoggedIn: req.session.user != null ? true : false, isAdmin: req.session.user && req.session.user.username.includes("admin") ? true : false, title: "Admin: Manage Comments", comments });
});

router.get("/comments/:userId", async (req, res) => {
    if (!req.session.user) {
        return res.redirect("/users/login?msg=Please login first.");
    }
    if (!req.params.userId || typeof req.params.userId !== 'string' || !req.params.userId.replace(/\s/g, "").length)
        throw `Enter a valid user Id`
    let comments = await commentsCollection.getAllCommentsOfAUser(req.params.userId);
    for (let c of comments) {
        c.user = await usersCollection.getUserById(c.userId);
    }
    res.render("admin/comments", { isUserLoggedIn: req.session.user != null ? true : false, isAdmin: req.session.user && req.session.user.username.includes("admin") ? true : false, title: "Admin: Manage Comments", comments });
});

router.get("/users/delete/:userId", async (req, res) => {
    if (!req.session.user) {
        return res.redirect("/users/login?msg=Please login first.");
    }
    if (!req.params.userId || typeof req.params.userId !== 'string' || !req.params.userId.replace(/\s/g, "").length)
        throw `Enter a valid user Id`
    await usersCollection.deleteUser(req.params.userId);
    res.redirect("/admin");
});

router.get("/reviews/delete/:reviewId", async (req, res) => {
    if (!req.session.user) {
        return res.redirect("/users/login?msg=Please login first.");
    }
    if (!req.params.reviewId || typeof req.params.reviewId !== 'string' || !req.params.reviewId.replace(/\s/g, "").length)
        throw `Enter a valid reviewId`;
    await reviewCollection.removeReview(req.params.reviewId);
    res.redirect("/admin/reviews");
});

router.get("/comments/delete/:reviewId/:commentId", async (req, res) => {
    if (!req.session.user) {
        return res.redirect("/users/login?msg=Please login first.");
    }
    if (!req.params.reviewId || typeof req.params.reviewId !== 'string' || !req.params.reviewId.replace(/\s/g, "").length)
        throw `Enter a valid reviewId`;
    if (!req.params.commentId || typeof req.params.commentId !== 'string' || !req.params.commentId.replace(/\s/g, "").length)
        throw `Enter a valid reviewId`
    await commentsCollection.removeComments(req.params.reviewId, req.params.commentId);
    res.redirect("/admin/comments");
});

module.exports = router;
