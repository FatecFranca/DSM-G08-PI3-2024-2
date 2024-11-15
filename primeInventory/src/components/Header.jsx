// src/components/Header.jsx
import { Link } from 'react-router-dom';

import  '../styles/navbar.css'
import  '../styles/home.css'

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img
              src="img/logo-projeto.png" 
              alt="Logo da PrimeInventory"
              className="img-fluid"
            />
          </a>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/login"> {/* Link para Login */}
                  <img src="/img/img_login.svg" alt="" style={{ maxWidth: "20px" }} />
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
