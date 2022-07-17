const router = require('express').Router();
// const {} = require("../models")

// Root home page
router.get("/", (req, res) => {
    res.render("home")
});

// Login/Signup page
router.get("/login", (req, res) => {
    res.render("login")
});

module.exports = router;