import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

interface User extends Document {
  email: string;
  password: string;
  passwordConfirm: string | undefined;
  checkPassword(candidatePassword: string, password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<User>({
  email: {
    type: String,
    required: [true, 'A user must have an email'],
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Password must be confirmed'],
    validate: {
      validator: function (val: string) {
        return val === this.password;
      },
      message: 'Passwords dont match! Retry again.',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 14);
  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.checkPassword = async (
  candidatePassword: string,
  password: string,
) => {
  return await bcrypt.compare(candidatePassword, password);
};

const User = mongoose.model('User', userSchema);

export default User;
