const express = require("express");
const morgan = require("morgan");
const paymentRoutes =require('./routes/payment.routes');

const app = express();

// Show logs by console
app.use(morgan('dev'));

app.use(paymentRoutes);

app.listen(3000);

console.log("Server on port:", 3000);