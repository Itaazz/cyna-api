const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const subscriptionRoutes = require('./src/routes/subscriptionRoutes');
const authMiddleware = require('./src/middlewares/authMiddleware');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);

app.use('/api/products', authMiddleware, productRoutes);
app.use('/api/cart', authMiddleware, cartRoutes);
app.use('/api/orders', authMiddleware, orderRoutes);
app.use('/api/subscriptions', authMiddleware, subscriptionRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
}); 