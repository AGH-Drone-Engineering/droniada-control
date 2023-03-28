import { useState } from 'react';
import { useSignInWithEmailAndPassword, useSignOut, useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'logic/fb';
import { useUserIsAdmin } from 'logic/auth';
import NukeControl from 'modules/pipeline/components/NukeControl';

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
      <div className='admin-header'>
        Signed in as {user.email}
        <button type="button" onClick={signOut}>
          Sign Out
        </button>
      </div>
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
    <div className='login-form'>
      <h2>Logowanie do panelu</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          signInWithEmailAndPassword(email, password);
        }}
      >
        <label htmlFor="email">Email: <br/></label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br/>
        <label htmlFor="password">Hasło: <br/></label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br/><br/>
        <button type="submit">Zaloguj się</button>
      </form>
      {error && <p>Error signing in: {error.message}</p>}
    </div>
  );
};

export default function AdminScreen() {
  const [isAdmin, isAdminLoading] = useUserIsAdmin();
  const [user, loading, error] = useAuthState(auth);

  return (
    <>
      {user ? <h1>Super Secret {isAdmin && <>Admin</> } Control Panel</h1> : <h1>Very normal login form to very normal panel</h1> }
      {loading && <p>Loading user...</p>}
      {error && <p>Error loading user: {error.message}</p>}
      {!loading && !error && (
        user
          ? <CurrentUser />
          : <SignIn />
      )}
      {isAdminLoading && <p>Loading admin status...</p>}
      {isAdmin &&
        <>
          <NukeControl/>
        </>
      }
    </>
  );
}
