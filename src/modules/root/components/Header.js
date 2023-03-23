import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <div className="links">
        <Link to="/intruder" reloadDocument>Intruz</Link>
        <Link to="/pipeline" reloadDocument>Rurociąg</Link>
        <Link to="/tree" reloadDocument>Drzewo życia</Link>
        <Link to="/demo" reloadDocument>Demo systemu</Link>
        <Link to="/admin" reloadDocument>Admin</Link>

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
