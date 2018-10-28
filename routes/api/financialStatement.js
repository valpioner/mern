const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// @route   GET api/finansialStatement/test
// @desc    Tests finansialStatement route
// @access  Public
router.get('/finansialStatement', (req, res) => res.json({}));

module.exports = router;