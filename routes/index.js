const express = require('express');
const router = express.Router();

// Inicio
router.get('/', (req, res, next) => {
  res.status(200).json({
    status: 200,
    message: 'AlwaysOn PM Dev API'
  })
});

module.exports = router;
