import { Link, useLocation } from 'react-router-dom'; 
import '../styles/navbar.css';
import '../styles/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Header = () => {
  const location = useLocation();

  if (location.pathname === '/gerenciamento') {
    return null; 
  }

  return (
    <header style={{ borderBottom: "2px solid #ffffff" }}>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          {/* Logo */}
          <a className="navbar-brand" href="/">
            <img
              src="img/logo-projeto.png"
              alt="Logo da PrimeInventory"
              className="img-fluid"
            />
          </a>
          
          {/* Botão de menu hamburguer */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {location.pathname !== '/login' && location.pathname !== '/cadastro' && location.pathname !== '/gerenciamento' ? (
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <img
                      src="img/logo_login.svg"
                      alt="Login Icon"
                      style={{ maxWidth: "20px" }}
                      className="mx-2"
                    />
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <img
                      src="img/icon-sair.png"
                      alt="Logout Icon"
                      style={{
                        maxWidth: "20px",
                        filter: "invert(1)",
                        mixBlendMode: "difference",
                      }}
                      className="mx-2"
                    />
                    Sair
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
