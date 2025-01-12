import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

interface User {
  data: {
    id: string;
    email: string;
  } | null;
  errors: string | null;
  loading: boolean;
}

const UserContext = createContext<
  [User, React.Dispatch<React.SetStateAction<User>>]
>([{ data: null, loading: true, errors: null }, () => {}]);

function UserProvider({ children }: any) {
  const [user, setUser] = useState<User>({
    data: null,
    loading: true,
    errors: null,
  });

  const token = localStorage.getItem('token');

  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  async function fetchUser() {
    const { data: response } = await axios.get(
      'http://127.0.0.1:3000/api/v1/users/protected',
    );

    if (response.data && response.data.user) {
      setUser({
        data: {
          id: response.data.user.id,
          email: response.data.user.email,
        },
        loading: false,
        errors: null,
      });
    } else if (response.data && response.data.error.length) {
      setUser({
        data: null,
        loading: false,
        errors: response.errors[0].msg,
      });
    }
  }

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setUser({
        data: null,
        loading: false,
        errors: null,
      });
    }
  }, [token]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
