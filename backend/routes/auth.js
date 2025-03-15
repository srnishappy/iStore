const express = require('express');
const router = express.Router();
const { adminCheck, authCheck } = require('../middleware/authCheck');
const {
  register,
  login,
  currentUser,
  ChangePassword,
} = require('../controllers/auth');
router.post('/register', register);
router.post('/login', login);
router.put('/change-password', ChangePassword);
router.post('/current-user', authCheck, currentUser);
router.post('/current-admin', authCheck, adminCheck, currentUser);
module.exports = router;
