const express = require('express');
const router = express.Router();

//======================================================
// Design Pattern Routes
//-------------------------
// Modern Patterns
//======================================================
router.get('/Chain', function (req, res) {
    res.render('Chain');
  });

  module.exports = router;