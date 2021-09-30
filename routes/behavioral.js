const express = require('express');
const router = express.Router();

//======================================================
// Design Pattern Routes
//-------------------------
// Behavioral Patterns
//======================================================
router.get('/Chain', function (req, res) {
    res.render('Chain');
  });
  
  router.get('/Command', function (req, res) {
    res.render('Command');
  });
  
  router.get('/Interpreter', function (req, res) {
    res.render('Interpreter');
  });
  
  router.get('/Iterator', function (req, res) {
    res.render('Iterator');
  });
  
  router.get('/Mediator', function (req, res) {
    res.render('Mediator');
  });
  
  router.get('/Memento', function (req, res) {
    res.render('Memento');
  });
  
  router.get('/Observer', function (req, res) {
    res.render('Observer');
  });
  
  router.get('/State', function (req, res) {
    res.render('State');
  });
  
  router.get('/Strategy', function (req, res) {
    res.render('Strategy');
  });
  
  router.get('/Template', function (req, res) {
    res.render('Template');
  });
  
  router.get('/Visitor', function (req, res) {
    res.render('Visitor');
  });
  
module.exports = router;