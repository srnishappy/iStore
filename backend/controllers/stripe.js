const prisma = require('../config/prisma');
const stripe = require('stripe')(
  'sk_test_51R0IYZDY7BNXdbIMYsyqB8nI0PV4KHj81iIQLuzsXloY2pVqS4M3W7rvYDtc8IVh2FqbXtzb656pYDvhaPliRhcK00NF09on5U'
);

exports.payment = async (req, res) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: {
        orderedById: req.user.id,
      },
    });
    const amountThb = cart.cartTotal * 100;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountThb,
      currency: 'thb',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};
