import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

mongoose
  .connect(process.env.DATABASE as string)
  .then(() => console.log('DB successfully connected'));

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
