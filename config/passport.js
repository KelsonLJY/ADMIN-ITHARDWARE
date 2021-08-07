const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const UserModel = require('../model/User')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, 
  
  (username, password, done) => {
    if('admin@gmail.com' != username){
      return done(null, false,  {message: 'Incorrect email.'}); 
    }

    if('password' != password){
      return done(null, false,  {message: 'Incorrect password.'}); 
    }

    return done(null, {
      email: username,
      full_name : 'Administrator'
    })
    // UserModel.findOne({ email: username }, function (err, user) {
    //   if (err) { return done(err); }
    //   if (!user) { return done(null, false); }
    //   let verifyPassword= bcrypt.compareSync(password, user.password);
    //   if (!verifyPassword) { return done(null, false,  {message: 'Incorrect username or password'}); }
    //   return done(null, user);
    // });

  }
))

passport.serializeUser((user, done) => {
  done(null, user.email)
})

passport.deserializeUser(async(id, done) => {
  // let user = await UserModel.findById(id).exec();
  done(null, {
    email: 'admin@gmail.com',
    full_name : 'Administrator'
  })
})