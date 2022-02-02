const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClientsSchema = new Schema({
name: String,
Faddress:String,
postcode: String,
city: String,
country:String,

user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
});
mongoose.model('Clients', ClientsSchema);
