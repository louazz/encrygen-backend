const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
var nodemailer = require('nodemailer');
var QRCode = require('qrcode')
var transporter = nodemailer.createTransport({
  service:'gmail',
  auth: {
    user: "encrygen@gmail.com",
    pass: "12AZqswx!!"
  },
  tls:{
      rejectUnauthorized:false,
  }
});
//POST new user route (optional, everyone has access)
router.post('/', auth.optional, async (req, res, next) => {
  const { body: { user } } = req;

  if(!user.username) {
    return res.status(422).json({
      errors: {
        username: 'is required',
      },
    });
  }
  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }
  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new Users(user);

  finalUser.setPassword(user.password);
  let img = await QRCode.toDataURL('https://encrygen.co.uk/');
  return finalUser.save()
    .then(async() => {
      
      let info = await transporter.sendMail({
        from: '"EncrygeN 👻" <ecrygen@gmail.com>',
        to: finalUser.email,
        subject: `Welcome to EncrygeN: ${user.username}✔`,
        text: 'Important',
        attachDataUrls: true,
        html: `Dear ${user.username}, <p>You can find your EncrygeN credential below (keep them safe): </p> <h4>username: ${user.username}</h4><h4>password: ${user.password}</h4><p></br> <img src= ${img} ></p> Best,<br> EncrygenN Team `
      });
      res.json({ user: finalUser.toAuthJSON() })});
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if(!user.username) {
    return res.status(422).json({
      errors: {
        username: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }
    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return res.status(400).send(info);
  })(req, res, next);
});

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
});

module.exports = router;
