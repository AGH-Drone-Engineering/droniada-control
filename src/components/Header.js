export default function Header({ appName }) {
  return (
    <header>
      <h1>{appName}</h1>
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
