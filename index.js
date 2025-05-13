const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const promoRoutes = require('./routes/promo.routes');

const app = express();
app.use(express.json());
app.use('/promos', promoRoutes);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
