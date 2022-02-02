const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
var nodemailer = require('nodemailer');

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

  router.post('/send',auth.optional, async (req, res, next) => {
    const { body: { mail } } = req;
    var target= mail.target;
    var key= mail.key;
    console.log(key)
    var link= mail.link;

      let info = await transporter.sendMail({
        from: '"EncrygeN 👻" <ecrygen@gmail.com>',
        to: 'louaizaiter@gmail.com',
        subject: 'Your last generation ✔',
        text: 'Important',
        html: `Dear costumer, <p>You have generated a document using encrygen with the following details: </p><h4>key: ${key}</h4><p>Best,</p><p>EncrygeN Team</p> `
      });
      console.log("Message sent: %s", info.messageId);
   return  res.ok
})

module.exports = router;


