const express = require('express');
const router = express.Router();
//======================================================
// Bootstrap Theme Routes
//======================================================
router.get('/bs', function (req, res) {
    res.render('bs');
});

router.get('/cerulean', function (req, res) {
    res.render('cerulean');
});

router.get('view/cosmo', function (req, res) {
    res.render('cosmo');
});

router.get('/cyborg', function (req, res) {
    res.render('cyborg');
});

router.get('/darkly', function (req, res) {
    res.render('darkly');
});

router.get('/flatly', function (req, res) {
    res.render('flatly');
});

router.get('/journal', function (req, res) {
    res.render('journal');
});

router.get('/litera', function (req, res) {
    res.render('litera');
});

router.get('/lumen', function (req, res) {
    res.render('lumen');
});

router.get('/lux', function (req, res) {
    res.render('lux');
});

router.get('/materia', function (req, res) {
    res.render('materia');
});

router.get('/minty', function (req, res) {
    res.render('minty');
});

router.get('/pulse', function (req, res) {
    res.render('pulse');
});

router.get('/sandstone', function (req, res) {
    res.render('sandstone');
});

router.get('/simplex', function (req, res) {
    res.render('simplex');
});

router.get('/sketchy', function (req, res) {
    res.render('sketchy');
});

router.get('/slate', function (req, res) {
    res.render('slate');
});

router.get('/solar', function (req, res) {
    res.render('solar');
});

router.get('/spacelab', function (req, res) {
    res.render('spacelab');
});

router.get('/superhero', function (req, res) {
    res.render('superhero');
});

router.get('/united', function (req, res) {
    res.render('united');
});

router.get('/yeti', function (req, res) {
    res.render('yeti');
});

module.exports = router;