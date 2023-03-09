import { auth } from 'logic/fb';
import { useAuthState } from 'react-firebase-hooks/auth';

export function useUserIsAdmin() {
  const [user, loading, error] = useAuthState(auth);
  const isAdmin = !loading && !error && user;
  return [isAdmin, loading, error];
}
