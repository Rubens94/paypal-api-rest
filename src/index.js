const cors = require('cors');
const express = require("express");
const morgan = require("morgan");
require('dotenv').config();
const paymentRoutes =require('./routes/payment.routes');

const app = express();

// Show logs by console
app.use(morgan('dev'));

// CORS
app.use( cors() );

// Read body
app.use( express.json() );

// Routes
app.use(paymentRoutes);

app.listen(process.env.PORT);

console.log("Server on port:", process.env.PORT);