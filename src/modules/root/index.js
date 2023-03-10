import Header from './components/Header';
import useLotsOfPoints from 'debug/lots-of-points';

export default function Root() {
  useLotsOfPoints();
  return (
    <>
      <Header />
      <h1>Wybierz aplikację</h1>
    </>
  );
}
