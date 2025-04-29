const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getOrders = async (req, res) => {
  try {
    const { userId } = req.user;
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { userId } = req.user;
    const { products } = req.body;
    const order = await prisma.order.create({
      data: {
        userId,
        products: {
          create: products.map(({ productId, quantity }) => ({
            productId,
            quantity,
          })),
        },
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 