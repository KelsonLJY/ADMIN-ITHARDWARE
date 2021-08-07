const router=require('express').Router()
const passport = require('passport')

router
.post("/api/login", (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(400).send({
                message : 'Invalid email or password'
            })
        }
        req.session.loggedin = true;
        req.session.user = user;
        req.login(user, (err) => {
            res.send({
                email : user.email,
                full_name : user.full_name
            })
        })
    })(req, res, next)
})


module.exports=router;