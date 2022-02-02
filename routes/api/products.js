const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Products = mongoose.model('Products');




router.get('/', auth.required, async (req, res, next) => {
    try {
        const products= await Products.find();

        res.status(200).json(products);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
})
router.get('/:id', auth.required, async (req, res, next) => {
    try {
        const id= req.params.id;
        const products= await Products.find({user: id});

        res.status(200).json(products);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
})
router.get('/show/:id', auth.required, async (req, res, next) => {
    try {
        const id= req.params.id;
        const products= await Products.findOne({_id: id});

        res.status(200).json(products);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
})
router.post('/new', auth.required, async (req, res, next) => {
      const { body: { product } } = req;
    const newproducts = new Products(product)

    try {
        await newproducts.save();

       res.status(201).json(newproducts);

    } catch(error) {
        res.status(400).json({ message : error.message});
    }

})

router.patch('/update/:id', auth.required, async(req, res, next) => {
    const id= req.params.id;
      const { body: { product } } = req;
      console.log(product)
    try{
        await Products.findOneAndReplace({
            _id: id,
        },
      product
        )
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
