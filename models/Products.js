const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductsSchema = new Schema({
name: String,
price: Number,
user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
});
mongoose.model('Products', ProductsSchema);
