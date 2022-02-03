const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Products = mongoose.model('Docs');
var nodemailer = require('nodemailer');
var QRCode = require('qrcode')
const User=  mongoose.model('Users');
const Profiles=  mongoose.model('Profiles');
const {encr, decr,f}= require('./Feistel.js');
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

router.get('/', auth.required, async (req, res, next) => {
    try {
        const products= await Products.find();

        res.status(200).json(products);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
})

router.post('/display/:id', auth.optional, async (req, res, next) => {
    console.log("key:"+ req.body.key)
    console.log("id:"+ req.params.id)
      
            try {   
                let prime=decodeURI(req.params.id)
                console.log("id:"+ prime)
                key= req.body.key
                console.log()
          
           let id= await decr(prime,f,key)
           console.log(id)
    
          
            const products= await Products.findOne({_id: id});
            const profile= await Profiles.findOne({user:products.user})
       
         
           const user= await User.findOne({_id: products.user});
           console.log(user)
           res.status(200).json({
               
                   "_id": products._id,
                   "title":products.title,
                   "content": products.content,
                   "user": user,
                   "profile": profile,
                   "date": products.created_at

               }
           );
        } catch(error) {
            res.status(404).json({message: error.message});
        }
        
})
router.get('/:userid', auth.required, async (req, res, next) => {
    try {
        const products= await Products.find({user: req.params.userid});

        res.status(200).json(products);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
})
router.post('/new', auth.required, async (req, res, next) => {
      const { body: { doc } } = req;
      console.log(doc.key)
     console.log(doc.title)
      key= doc.key
      console.log(key)
    const newproducts = await new Products(doc)
    const user= await User.findOne({_id: newproducts.user});
    let u= await encr(newproducts._id.toString(),f, key)
    console.log("encryption: "+u);
    newproducts.encr= u.toString()
    try {
        await newproducts.save();
        let img = await QRCode.toDataURL('https://localhost:3000/document/'+encodeURI(newproducts.encr));
        let info = await transporter.sendMail({
            from: '"EncrygeN 👻" <ecrygen@gmail.com>',
            to: user.email,
            subject: `Your last generation: ${newproducts._id} ✔`,
            text: 'Important',
            attachDataUrls: true,
            html: `Dear user, <p>You have generated a document using encrygen with the following details: </p><h4>key: ${doc.key}</h4> </br> <img src= ${img} ><p>Best,</p><p>EncrygeN Team</p> `
          });
       res.status(201).json(newproducts);

    } catch(error) {
        res.status(400).json({ message : error.message});
    }

})

router.patch('/update/:id', auth.required, async(req, res, next) => {
    const id= req.params.id;
      const { body: { doc } } = req;
      console.log(doc);
      let u= await encr(id,f, doc.key)
      console.log("encryption: "+u);
    try{ 
     const  p= await Products.findOneAndUpdate({
            _id: id,
        },{
            encr: u
        }
        )
        console.log(p.encr)
        res.status(202).json({_id: id});

    } catch (error) {
        res.status(401).json({message: error.message});
    }

})

router.delete('/delete/:id', auth.required, async (req, res, next) => {
    const id= req.params.id;

    try {
        await Products.findOneAndRemove({_id: id});
     res.status(203).json({id:id});

    }catch(error) {
     res.status(402).json({message: error.message});
    }

})
module.exports = router;
