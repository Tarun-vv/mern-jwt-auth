import { NextFunction, Request, Response } from 'express';
import User from '../models/userModal';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../error/appError';
import { promisify } from 'util';

export const signup = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );

    res.status(201).json({
      status: 'success',
      token,
      data: {
        newUser,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
      return next(
        new AppError('Make sure to send both email and password', 400),
      );
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.checkPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 400));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
      console.log(token);
    }

    if (!token)
      return next(
        new AppError('You are not logged in! Please log in again', 400),
      );

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;
    console.log('DECODED', decoded);

    const user = await User.findById(decoded.id);
    console.log(user);

    if (!user) {
      return next(
        new AppError('User does not exist. Please log in again', 400),
      );
    }

    // NOTE: set up tsconfig.json and types file for this
    (req as any).user = user.email;

    next();
  } catch (error: any) {
    console.log(error);
  }
};

// NOTE: PROTECTED ROUTE
export const protectedRoute = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.user });

  try {
    res.send({
      status: 'success',
      data: {
        user: {
          id: user?._id,
          email: user?.email,
        },
      },
      errors: [],
    });
  } catch (error: any) {
    console.log(error);
  }
};
