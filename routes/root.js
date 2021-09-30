const express = require('express');
const router = express.Router();

//======================================================
// Root - Home Page
//======================================================
router.get('/', (req, res) => {
    // render `home.ejs` with the list of posts
    res.render('home');
});

//======================================================
// About
//======================================================
router.get('/about', (req, res) => {
    // render `home.ejs` with the list of posts
    res.render('about');
});

router.get('/pageunderconstruction', (req, res) => {
    // render `home.ejs` with the list of posts
    res.render('pageunderconstruction');
});
//======================================================

module.exports = router;