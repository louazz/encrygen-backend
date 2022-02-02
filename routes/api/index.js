const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/profiles', require('./profiles'));
router.use('/products', require('./products'));
router.use('/clients', require('./clients'));
router.use('/productsquantities', require('./productsquantities'));
router.use('/invoices', require('./invoices'));
router.use('/docs', require('./docs'));
router.use('/mail', require('./mail'));
module.exports = router;
