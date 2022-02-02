const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProfilesSchema = new Schema({
  Institution: String,
  country: String,
  city: String,
  postcode: String,
  user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Users'
      }

});
mongoose.model('Profiles', ProfilesSchema);
