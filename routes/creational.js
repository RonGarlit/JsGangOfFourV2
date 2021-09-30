const express = require('express');
const router = express.Router();

//======================================================
// Design Pattern Routes
//-------------------------
// Creational Patterns
//======================================================
router.get('/AbstractFactory', function (req, res) {
  res.render('AbstractFactory');
});

router.get('/Builder', function (req, res) {
  res.render('Builder');
});

router.get('/FactoryMethod', function (req, res) {
  res.render('FactoryMethod');
});

router.get('/Prototype', function (req, res) {
  res.render('Prototype');
});

router.get('/Singleton', function (req, res) {
  res.render('Singleton');
});

module.exports = router;