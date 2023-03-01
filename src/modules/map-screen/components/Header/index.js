import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <div className="links">
        <Link to="/intruder">Intruz</Link>
        <Link to="/pipeline">Rurociąg</Link>
        <Link to="/tree">Drzewo życia</Link>
      </div>
      <div className="head1">
        <h1>
          Droniada 2023
        </h1>
        <img src={process.env.PUBLIC_URL + '/agh-de-logo.png'} alt='agh-de-logo' />
      </div>
      <div className="empty">

      </div>
    </header>
  );
}
