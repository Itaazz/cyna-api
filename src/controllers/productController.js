const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true,
      },
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, categoryId, price, quantity } = req.body;
    const product = await prisma.product.create({
      data: {
        name,
        description,
        categoryId,
        price,
        quantity,
      },
      include: {
        category: true,
      },
    });
    res.json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 