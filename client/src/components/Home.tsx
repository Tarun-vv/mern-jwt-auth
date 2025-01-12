import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function Home() {
  const [response, setState] = useContext(UserContext);

  function handleLogout() {
    setState({ data: null, loading: false, errors: null });
    localStorage.removeItem('token');
  }

  return (
    <div>
      {response.data ? (
        <div>
          <Link to="/protected">Go to main page</Link>
          <button onClick={handleLogout}>Log out</button>
        </div>
      ) : (
        <div>
          <Link to="/login">Go to login page</Link>
          <Link to="/signup">Go to signup page</Link>
        </div>
      )}
    </div>
  );
}
