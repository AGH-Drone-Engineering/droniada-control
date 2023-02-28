export default function Header() {
  return (
    <header>
      <div className="links">
        <a href="/droniada-control/intruder">Intruz</a>
        <a href="/droniada-control/pipeline">Rurociąg</a>
        <a href="/droniada-control/tree">Drzewo życia</a>
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
