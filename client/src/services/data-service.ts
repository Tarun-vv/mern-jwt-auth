import axios from 'axios';

interface User {
  email: string;
  password: string;
  passwordConfirm?: string;
}

const BASE_URL = 'http://127.0.0.1:3000';

export async function signin(newUser: User) {
  try {
    const createdUser = await axios.post(
      `${BASE_URL}/api/v1/users/signup`,
      newUser,
    );
    localStorage.setItem('token', createdUser.data.token);
    console.log(createdUser);
  } catch (error) {
    console.log(error);
  }
}

export async function login(userDetails: User) {
  try {
    const loggedInUser = await axios.post(
      `${BASE_URL}/api/v1/users/login`,
      userDetails,
    );
    console.log(loggedInUser);
    localStorage.setItem('token', loggedInUser.data.token);
  } catch (error) {
    console.log(error);
  }
}
