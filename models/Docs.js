const mongoose = require('mongoose');
const { Schema } = mongoose;

const DocsSchema = new Schema({
    title:String,
    content:String,
    encr: String,

  
  user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Users'
      }

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});
mongoose.model('Docs', DocsSchema);
