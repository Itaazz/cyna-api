const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getSubscriptions = async (req, res) => {
  try {
    const { userId } = req.user;
    const subscriptions = await prisma.subscription.findMany({
      where: { userId },
      include: {
        plan: true,
      },
    });
    res.json(subscriptions);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createSubscription = async (req, res) => {
  try {
    const { userId } = req.user;
    const { planId } = req.body;
    const subscription = await prisma.subscription.create({
      data: {
        userId,
        planId,
        startDate: new Date(),
        status: 'Active',
        autoRenew: true,
      },
      include: {
        plan: true,
      },
    });
    res.json(subscription);
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 