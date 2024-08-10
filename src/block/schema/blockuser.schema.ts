import { Schema } from 'mongoose';

 const BlockSchema = new Schema({
 
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true
  },
  blockUsername: {
    type: String,
    required: [true, 'blockUsername is required'],
    trim: true
  },
  
});

// Create a composite unique index on `username` and `block_username`
BlockSchema.index({ username: 1, block_username: 1 }, { unique: true });

export default BlockSchema;