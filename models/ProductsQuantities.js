const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductsQuantitiesSchema = new Schema({

  product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products'
        },

  quantity: Number,
  user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Users'
      }

});
mongoose.model('ProductsQuantities', ProductsQuantitiesSchema);
