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


module.exports = router;