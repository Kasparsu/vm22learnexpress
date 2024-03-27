const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./models/User.js');

router.get('/register', async (req, res) => {
    res.render('auth/register.njk');
});

router.post('/register', async (req, res) => {
    let user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if(req.body.password !== req.body.password_confirm || user){
        res.redirect('/register');
    } else {
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 12)
        });
        res.redirect('/');
    }
});

module.exports = router;