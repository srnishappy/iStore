const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');
exports.authCheck = async (req, res, next) => {
  try {
    const headerToken = req.headers.authorization;
    // console.log(headerToken);
    if (!headerToken) {
      return res.status(401).json({ msg: 'No Token Authorization' });
    }
    const token = headerToken.split(' ')[1];
    const decode = jwt.verify(token, process.env.SECRET);
    req.user = decode;
    const user = await prisma.user.findFirst({
      where: {
        email: req.user.email,
      },
    });
    if (user.enabled === false) {
      return res.status(400).json({ msg: 'This account is disabled' });
    }

    // console.log('middleware');
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Token Error' });
  }
};
exports.adminCheck = async (req, res, next) => {
  try {
    const { email } = req.user;
    // console.log(email);
    const adminUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!adminUser || adminUser.role !== 'admin') {
      return res.status(403).json({ msg: 'Admin Only' });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Admin access denied' });
  }
};
