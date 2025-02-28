const prisma = require('../config/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ msg: 'กรุณากรอกอีเมล' });
    }
    if (!password) {
      return res.status(400).json({ msg: 'กรุณากรอกรหัสผ่าน' });
    }
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (user) {
      return res.status(400).json({ msg: 'อีเมลนี้ถูกใช้ไปแล้ว' });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email: email,
        password: hashPassword,
      },
    });
    res.send('สมัครสมาชิกสำเร็จ');
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user || !user.enabled) {
      return res.status(400).json({ msg: 'อีเมลไม่ถูกต้อง' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(500).json({ msg: 'รหัสผ่านไม่ถูกต้อง' });
    }
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: '1d',
      },
      (err, token) => {
        if (err) {
          return res.status(500).json({ msg: 'server error' });
        }
        res.json({ payload, token });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};
exports.currentUser = async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: { email: req.user.email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
    res.json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};
