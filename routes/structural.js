const express = require('express');
const router = express.Router();

//======================================================
// Design Pattern Routes
//-------------------------
// Structural Patterns
//======================================================
router.get('/Adapter', function (req, res) {
    res.render('Adapter');
});

router.get('/Bridge', function (req, res) {
    res.render('Bridge');
});

router.get('/Composite', function (req, res) {
    res.render('Composite');
});

router.get('/Decorator', function (req, res) {
    res.render('Decorator');
});

router.get('/Facade', function (req, res) {
    res.render('Facade');
});

router.get('/Flyweight', function (req, res) {
    res.render('Flyweight');
});

router.get('/Proxy', function (req, res) {
    res.render('Proxy');
});

module.exports = router;