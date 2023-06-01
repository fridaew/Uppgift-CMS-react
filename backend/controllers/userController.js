const router = require('express').Router();
const { verifyToken, checkAdmin } = require('../authentication/auth');
const { addUser, login, addAdmin } = require('../models/userModel');


// Create
router.post('/add', addUser);
router.post('/login', login);

router.post('/newadmin', verifyToken, addAdmin )

module.exports = router;