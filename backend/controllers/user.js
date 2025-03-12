const prisma = require('../config/prisma');

exports.listUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        enabled: true,
        address: true,
      },
    });
    res.send(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.ChangStatus = async (req, res) => {
  try {
    const { id, enabled } = req.body;
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: { enabled: enabled },
    });
    res.send('Update Status Success');
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.ChangRole = async (req, res) => {
  try {
    const { id, role } = req.body;
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: { role: role },
    });
    res.send('Change Role Success');
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.userCart = async (req, res) => {
  try {
    const { cart } = req.body;
    // console.log(cart);
    // console.log(req.user.id);
    const user = await prisma.user.findFirst({
      where: {
        id: Number(req.user.id),
      },
    });
    // console.log(user);
    //Delete Old cart item
    await prisma.productOnCart.deleteMany({
      where: {
        cart: { orderedById: user.id },
      },
    });
    //Delete old Cart
    await prisma.cart.deleteMany({
      where: {
        orderedById: user.id,
      },
    });
    //เตรียมสินค้า
    let products = cart.map((item) => ({
      productId: item.id,
      count: item.count,
      price: item.price,
    }));
    //หาผลรวม
    let cartTotal = products.reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );
    //ตระกร้าใหม่
    const newCart = await prisma.cart.create({
      data: {
        products: {
          create: products,
        },
        cartTotal: cartTotal,
        orderedById: user.id,
      },
    });
    console.log(newCart);
    res.send('Add Cart ok');
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};
exports.getUserCart = async (req, res) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: {
        orderedById: Number(req.user.id),
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    // console.log(cart);
    res.json({
      products: cart.products,
      cartTotal: cart.cartTotal,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};
exports.emptyCart = async (req, res) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: {
        orderedById: Number(req.user.id),
      },
    });
    if (!cart) {
      return res.status(500).json({ msg: 'No Cart' });
    }
    await prisma.productOnCart.deleteMany({
      where: {
        cartId: cart.id,
      },
    });
    const result = await prisma.cart.deleteMany({
      where: {
        orderedById: Number(req.user.id),
      },
    });
    console.log(result);
    res.json({ msg: 'Empty Cart Success', deleteCount: result.count });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};
exports.saveAddress = async (req, res) => {
  try {
    const { address } = req.body;
    const addressUser = await prisma.user.update({
      where: {
        id: Number(req.user.id),
      },
      data: {
        address: address,
      },
    });
    res.json({ msg: 'Save Address Success' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};
exports.saveOrder = async (req, res) => {
  try {
    const { id, amount, status, currency } = req.body.paymentIntent;
    //1 getuser cart
    const userCart = await prisma.cart.findFirst({
      where: { orderedById: Number(req.user.id) },
      include: {
        products: {
          include: { product: true },
        },
      },
    });
    //Check empty
    if (!userCart || userCart.products.length === 0) {
      return res.status(400).json({ ok: false, msg: 'Cart is Empty' });
    }
    //Check quantity
    // for (const item of userCart.products) {
    //   const product = await prisma.product.findUnique({
    //     where: {
    //       id: item.productId,
    //     },
    //     select: {
    //       quantity: true,
    //       title: true,
    //     },
    //   });
    //   if (!product || item.count > product.quantity) {
    //     return res.status(400).json({
    //       ok: false,
    //       msg: `ขออภัยสินค้า ${product.title || 'product'} หมด`,
    //     });
    //   }
    //   // console.log(product);
    // }
    // Create New Order
    const amountThb = Number(amount) / 100;
    const order = await prisma.order.create({
      data: {
        products: {
          create: userCart.products.map((item) => ({
            productId: item.productId,
            count: item.count,
            price: item.price,
          })),
        },
        orderedBy: {
          connect: { id: req.user.id },
        },
        cartTotal: userCart.cartTotal,
        stripePaymentId: id,
        amount: amountThb,
        status: status,
        currency: currency,
      },
    });
    // stripePaymentId String?
    // amount          Int?
    // status          String?
    // currency        String?
    //update productS
    const update = userCart.products.map((item) => ({
      where: { id: item.productId },
      data: {
        quantity: { decrement: item.count },
        sold: { increment: item.count },
      },
    }));
    console.log(update);
    await Promise.all(update.map((updated) => prisma.product.update(updated)));
    await prisma.cart.deleteMany({
      where: {
        orderedById: Number(req.user.id),
      },
    });
    res.json({ ok: true, order });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.getOrder = async (req, res) => {
  try {
    //code
    const orders = await prisma.order.findMany({
      where: { orderedById: Number(req.user.id) },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    if (orders.length === 0) {
      return res.status(400).json({ ok: false, message: 'No orders' });
    }

    res.json({ ok: true, orders });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
