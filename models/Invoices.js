const mongoose = require('mongoose');
const { Schema } = mongoose;

const InvoicesSchema = new Schema({
  client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Clients'
        },
  products: [ {product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products',
            
        },
        quantity: Number,} 
    ],
    content:String,
    encr: String,
  total: Number,
  
  user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Users'
      }

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});
mongoose.model('Invoices', InvoicesSchema);
