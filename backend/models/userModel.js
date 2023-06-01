const User = require('../schemas/userSchema');
const Admin = require('../schemas/adminSchema')
const bcrypt = require('bcryptjs');
const { generateToken } = require('../authentication/auth');


exports.addAdmin = async (req, res) => {
  try {
    
    const { adminId } = req.body

    if(!adminId) return res.status(400).json({ message: 'You need to enter admin ID' })

    const admin = await Admin.create({ adminId })

    if(!admin) {
      return res.status(500).json({ message: 'Something went wrong' })
    }

    res.status(201).json({ message: 'Admin added, you need to login again for it to work' })

  } catch (err) {
      if(err.code == 11000) {
        return res.status(400).json({ message: 'this admin already exists' })
      }
  }
}


// Add new user

exports.addUser = async (req, res) => {
  const { email, password } = req.body;

  if(!email) res.status(400).json({ message: 'You need to enter an email address' });
  if(!password) res.status(400).json({ message: 'You need to enter a password' });

  // Hashing password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt)

  // Creating new user with hashed password on database
  const _user = new User({ email, passwordHash: hash })
  const user = await _user.save()

  if(!user) res.status(500).json({ message: 'Something went wrong when creating new user' });

  // Generating token
  res.status(201).json(generateToken(user))
}



exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'You need to enter an email address and a password' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Incorrect credentials' });
    }

    const result = await bcrypt.compare(password, user.passwordHash);

    if (!result) {
      return res.status(401).json({ message: 'Incorrect credentials' });
    }

    // Check if the user is an admin
    const admin = await Admin.findOne({ adminId: user._id });

    if (admin) {
      // Generate token for admin
      const token = generateToken(user);
      return res.status(200).json({ token });
      
    } else {
      return res.status(401).json({ message: 'Access restricted. You need to login as an admin.' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server error' });
  }
};









// exports.login = async (req, res) => {
  
//   const { email, password } = req.body;

//   if(!email || !password) res.status(400).json({ message: 'You need to enter an email address and a password' })

//   // Checking if input email exists as saved user email
//   const user = await User.findOne({ email });
//   if(!user) return res.status(401).json({ message: 'Incorrect credentials' })
  

//   // Comparing entered password with decrypted saved password
//   const result = await bcrypt.compare(password, user.passwordHash);
//   if(!result) return res.status(401).json({ message: 'Incorrect credentials' })

//   // Generating token
//   res.status(200).json(generateToken(user))
// }

