const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Products = mongoose.model('ProductsQuantities');




router.get('/', auth.required, async (req, res, next) => {
    try {
        const products= await Products.find();

        res.status(200).json(products);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
})

router.post('/new', auth.required, async (req, res, next) => {
      const { body: { productsquantities } } = req;
    const newproducts = new Products(productsquantities)

    try {
        await newproducts.save();

       res.status(201).json(newproducts);

    } catch(error) {
        res.status(400).json({ message : error.message});
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
