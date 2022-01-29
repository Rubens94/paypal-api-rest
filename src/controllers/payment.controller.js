const createOrder = (req, res) => {
    res.send('Created order');
}

const captureOrder = (req, res) => {
    res.send('Captured order');
}

const cancelOrder = (req, res) => {
    res.send('Canceled order');
}
module.exports = {
    createOrder,
    captureOrder,
    cancelOrder
}