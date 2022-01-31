const { Router } = require('express');
const { createOrder,
        captureOrder,
        cancelOrder
} = require('../controllers/payment.controller');

const router = Router();

router.get('/', (req, res) => {
    res.send('Server runing');
});

router.post('/create-order', createOrder);

router.get('/capture-order', captureOrder);

router.get('/cancel-order', cancelOrder);

module.exports = router;