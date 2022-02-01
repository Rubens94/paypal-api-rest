const axios = require('axios');

const createOrder = async(req, res) => {
  const { currency_code, value, description } = req.body
  const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code,
            value,
          },
          description
        }
      ],
      application_context: {
        brand_name: "mycompany.com",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `${process.env.HOST}/capture-order`,
        cancel_url: `${process.env.HOST}/cancel-payment`,
      },
    };

  // format the body
  const params = new URLSearchParams();
  try{

    params.append("grant_type", "client_credentials");
    
    // Get access_token from paypal
    const { data: {access_token} } = await axios.post(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: process.env.CLIENTID,
          password: process.env.SECRET,
        },
      }
    );
  
    const response = await axios.post(`${process.env.URL}/v2/checkout/orders`, order, {
      headers: {
          Authorization: `Bearer ${access_token}`
        }
    });
    
    res.json(response.data);
  } catch(err) {
    res.status(500).send('Something goes wrong')
  }
}

const captureOrder = async(req, res) => {

  const { token } = req.query;

  const response = await axios.post(
    `${process.env.URL}/v2/checkout/orders/${token}/capture`,
    {},
    {
      auth: {
        username: process.env.CLIENTID,
          password: process.env.SECRET,
      },
    }
  );

  console.log(response.data);
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