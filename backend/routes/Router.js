const express = require('express');
const router = express.Router();

router.use('/api/users', require('./UserRoutes'));
router.use('/api/photos', require('./PhotoRoutes'));

// Test Rout
router.get('/', (req, res) => {
  res.send('Working API!');
});

module.exports = router;
