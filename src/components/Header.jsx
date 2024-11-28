import logo from '../assets/restaurant_562678.png'
import './Header.css'
export default function Header (){
return (
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container justify-content-center">
    <div className="d-flex align-items-center">
      <a className="navbar-brand me-4" href="/">
        <img
          src={logo}
          alt="Logo"
          width="30"
          height="24"
          className="d-inline-block align-text-top"
        />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-link active" aria-current="page" href="/">Home</a>
          <a className="nav-link" href="http://localhost:5173/Menu">Menu</a>
          <a className="nav-link" href="http://localhost:5173/Cozinha">Cozinha</a>
          <a className="nav-link" href="http://localhost:5173/login">Login</a>
        </div>
      </div>
    </div>
  </div>
</nav>
)
}