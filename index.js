const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const cartRoutes = require('./routes/cart.routes')
const promoRoutes = require('./routes/promo.routes');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 8084;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use('/api/v1/promos', promoRoutes);
app.use('/api/v1/carts', cartRoutes)

connectDB();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
