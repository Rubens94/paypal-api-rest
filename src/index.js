const express = require("express");
const morgan = require("morgan");
require('dotenv').config();
const paymentRoutes =require('./routes/payment.routes');

const app = express();

// Show logs by console
app.use(morgan('dev'));

app.use(paymentRoutes);

app.listen(process.env.PORT);

console.log("Server on port:", process.env.PORT);