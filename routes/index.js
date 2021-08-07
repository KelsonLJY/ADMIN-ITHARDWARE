const router = require('express').Router();
const isAuth = require('../middleware/auth').isAuth;
router.get('/' , isAuth,(req, res) => {
    console.log(req.session.loggedin)
    res.render('Home')
})

router.get('/login' ,(req, res) => {
    res.render('login')
})

router.get('/logout', (req, res, next) => {
    req.session.loggedin = false;
    req.logout();
    res.redirect('/login');
})

module.exports=router;