const express = require('express');
const router = express.Router();

/* GET form page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Tiny OCR' });
});

module.exports = router;
