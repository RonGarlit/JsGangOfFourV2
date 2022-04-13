const express = require('express');
const router = express.Router();

//======================================================
// Design Pattern Routes
//-------------------------
// Modern Patterns
//======================================================
router.get('/Namespace', function (req, res) {
  res.render('Namespace');
});

router.get('/Module', function (req, res) {
  res.render('Module');
});

module.exports = router;