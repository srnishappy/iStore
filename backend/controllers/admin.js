const prisma = require('../config/prisma');

exports.changOrderStatus = async (req, res) => {
  try {
    const { orderId, orderStatus } = req.body;
    const orderUpdate = await prisma.order.update({
      where: {
        id: Number(orderId),
      },
      data: {
        orderStatus: orderStatus,
      },
    });
    res.json(orderUpdate);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'server error' });
  }
};
exports.getOrderAdmin = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        products: {
          include: {
            product: true,
          },
        },
        orderedBy: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'server error' });
  }
};
