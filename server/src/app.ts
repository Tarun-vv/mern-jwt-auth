import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import userRouter from '../routes/userRoutes';

const app = express();
app.use(express.json());

app.use(cors({ origin: 'http://localhost:5173' }));

app.use('/api/v1/users', userRouter);

// NOTE: error handling
interface CustomError extends Error {
  statusCode?: number;
  status?: string;
}

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

export default app;
