import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  surname: {
    type: String,
    required: [true, 'Surname is required'],
    trim: true
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  birthdate: {
    type: Date,
    required: [true, 'Birthdate is required']
  },
  email: {
    type: String,
    required: false,
    trim: true,
    lowercase: true,
    validate: {
      validator: (v: string) => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v),
      message: props => `${props.value} is not a valid email!`
    }
  },
  phone: {
    type: String,
    required: false,
    trim: true
  }
});
