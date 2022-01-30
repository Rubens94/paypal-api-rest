const axios = require('axios');

const createOrder = async(req, res) => {
    const order = {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: "105.70",
            },
          },
        ],
        application_context: {
          brand_name: "mycompany.com",
          landing_page: "NO_PREFERENCE",
          user_action: "PAY_NOW",
          return_url: `localhost:${process.env.PORT}/capture-order`,
          cancel_url: `localhost:${process.env.PORT}/cancel-payment`,
        },
      };

    const response = await axios.post(`${process.env.URL}/v2/checkout/orders`, order, {
        auth: {
            username: process.env.CLIENTID,
            password: process.env.SECRET
        }
    });
    const { data } = response;
    
    res.send(data);
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