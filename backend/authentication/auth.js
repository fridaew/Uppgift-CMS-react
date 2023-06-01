const Admin = require('../schemas/adminSchema')

const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

// Create token
exports.generateToken = (user) => {
  return jwt.sign({ _id: user._id }, secretKey, { expiresIn: '1d' })
}


// Verify token
exports.verifyToken = (req, res, next) => {
  try {
    
    const token = req.headers.authorization.split(' ')[1]
    req.userId = jwt.verify(token, secretKey)._id
    next();

  } catch {
    res.status(401).json({ message: 'Access restricted. You need to login.' })
  }
}

exports.checkAdmin = async (req, res, next) => {

  console.log(req.userId)
  const admin = await Admin.findOne({ adminId: req.userId })


  if(!admin) {
    return res.status(401).json({
      message: 'you need to be admin to be able to do this'
    })
  }

  next()
}

