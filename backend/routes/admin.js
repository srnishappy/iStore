const express = require('express');
const router = express.Router();
const { authCheck } = require('../middleware/authCheck');
const { changOrderStatus, getOrderAdmin } = require('../controllers/admin');
router.put('/admin/order-status', authCheck, changOrderStatus);
router.get('/admin/orders', authCheck, getOrderAdmin);

module.exports = router;
