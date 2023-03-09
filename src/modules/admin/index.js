import { useState } from 'react';
import { useSignInWithEmailAndPassword, useSignOut, useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'logic/fb';
import { useUserIsAdmin } from 'logic/auth';

function CurrentUser() {
  const [user, userLoading, userError] = useAuthState(auth);
  const [signOut, signOutLoading, signOutError] = useSignOut(auth);

  if (userLoading) {
    return <p>Loading user...</p>;
  }

  if (userError) {
    return <p>Error loading user: {userError.message}</p>;
  }

  if (signOutLoading) {
    return <p>Signing out...</p>;
  }

  if (signOutError) {
    return <p>Error signing out: {signOutError.message}</p>;
  }

  if (user) {
    return (
      <>
        <p>Signed in as {user.email}</p>
        <button type="button" onClick={signOut}>
          Sign Out
        </button>
      </>
    );
  }

  return <p>Not signed in</p>;
}

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error
  ] = useSignInWithEmailAndPassword(auth);

  if (loading) {
    return <p>Logging in...</p>;
  }

  if (user) {
    return <p>Signed in as {user.email}</p>;
  }

  return (
    <>
      <h2>Sign In</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          signInWithEmailAndPassword(email, password);
        }}
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
      {error && <p>Error signing in: {error.message}</p>}
    </>
  );
};

export default function AdminScreen() {
  const [isAdmin, isAdminLoading] = useUserIsAdmin();
  const [user, loading, error] = useAuthState(auth);

  return (
    <>
      <h1>Super Secret Admin Control Panel</h1>
      {loading && <p>Loading user...</p>}
      {error && <p>Error loading user: {error.message}</p>}
      {!loading && !error && (
        user
          ? <CurrentUser />
          : <SignIn />
      )}
      {isAdminLoading && <p>Loading admin status...</p>}
      {isAdmin && <p>You&apos;re an admin, Harry!</p>}
    </>
  );
}
