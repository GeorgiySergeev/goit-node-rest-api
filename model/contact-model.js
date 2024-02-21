import { model, Schema } from 'mongoose';

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

// const contactSchema = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: [true, 'Email already existed...'] },
//   phone: { type: Number, required: true },
//   favorite: { type: Boolean },
// });

const Contact = model('Contact', contactSchema);

export default Contact;
