import { useState } from 'react'; 
import { Link } from 'react-router-dom';
import 'tiny-slider/dist/tiny-slider.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/gerenciamento.css';
import { useEffect } from 'react';

import Loader from './Loader';


const Gerenciamento = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  



  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3800);
  }, []);

  if (isLoading) {
    return <Loader />;
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 d-lg-none bg-menu-mob" style={{height: '80px' }}>
        <button
            className="btn btn-white mt-3"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            >
        ☰
        </button>

        </div>

        {/* Menu lateral - visível apenas em telas mobile */}
        <div className={`col-lg-3 d-lg-none ${menuOpen ? 'd-block' : 'd-none'} bg-menu-mob`}>
          <ul className="list-unstyled">
            <li><Link to="#">
                <img  src="img/logo-marca-gerenciamento.png" alt="" />
            </Link></li>



            <li><Link to="#">Item 2</Link></li>
            <li><Link to="#">Item 3</Link></li>
            <li><Link to="#">Item 4</Link></li>
          </ul>
        </div>

        {/* Elemento visível apenas em telas de desktop */}
        <div className="col-lg-2 d-none d-lg-block section-edition">
            <ul className="list-unstyled">
                <li>
                    <Link to="#">
                        <img  src="img/logo-marca-gerenciamento.png" alt="" />
                    </Link>
                </li>



                <li><Link to="#">Item 2</Link></li>
                <li><Link to="#">Item 3</Link></li>
                <li><Link to="#">Item 4</Link></li>
          </ul>
        </div>

        {/* Coluna principal */}
        <div className="col-lg-10">
          <h1>Gerenciamento</h1>
          <p>Aqui está o conteúdo de gerenciamento.</p>
        </div>
      </div>
    </div>
  );
};

export default Gerenciamento;
