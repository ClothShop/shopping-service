const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const cartRoutes = require('./routes/routes')
const promoRoutes = require('./routes/promo.routes');

const app = express();
app.use(express.json());
app.use('/promos', promoRoutes);
app.use('/carts', cartRoutes)

connectDB();

const PORT = process.env.PORT || 8084;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
