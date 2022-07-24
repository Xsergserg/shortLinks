const {Router, response} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const config = require('config');
const User = require('../models/User');
const router = Router();

router.post('/register', [check('email', 'Wrong email').isEmail(), check('password', 'Password should be at least 6 characters').isLength({min: 6})], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(), message: "The form is filled out incorrectly"});
        }
        const {email, password} = req.body;
        let user = await User.findOne({email});
        if (user) {
            return res.status(400).json({message: "User with current e-mail is already exists"})
        }
        const hashPass = await bcrypt.hash(password, 10);
        user = new User({email: email, password: hashPass})
        await user.save();
        return res.status(201).json({message: "User created"})
    } catch (e) {
        return res.status(500).json({message: "Server error"});
    }
})

router.post('/login', [check('email', 'Enter real email').normalizeEmail().isEmail(), check('password', 'Enter password').exists()], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(), message: "Wrong fields"});
        }
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: "User is not exist"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: "Wrong password"});
        }
        const token = jwt.sign({userId: user.id}, config.get('jwtSecret'), {expiresIn: '1h'})
        return res.json({token, userId: user.id})
    } catch (e) {
        res.status(500).json({message: "Server error"});
    }
});

router.get("/", [], async (req, res) => {
    return res.status(201).json("Hello")
})

module.exports = router;