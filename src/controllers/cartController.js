const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const { productId, quantity } = req.body;
    const cart = await prisma.cart.upsert({
      where: { userId },
      update: {
        items: {
          create: {
            productId,
            quantity,
          },
        },
      },
      create: {
        userId,
        items: {
          create: {
            productId,
            quantity,
          },
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    res.json(cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 