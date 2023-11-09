const express = require('express');
const router = express.Router();

router.use('/api/users', require('./UserRoutes.jsx'));
router.use('/api/photos', require('./PhotoRoutes.jsx'));

// Test Rout
router.get('/', (req, res) => {
  res.send('Working API!');
});

module.exports = router;
