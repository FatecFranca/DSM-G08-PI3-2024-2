import { useState } from "react";
import { Link } from "react-router-dom";
import "tiny-slider/dist/tiny-slider.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/gerenciamento.css";

const Gerenciamento = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-12 d-lg-none bg-menu-mob"
          style={{ height: "80px" }}
        >
          <button
            className="btn btn-white mt-3"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {/* Menu lateral - visível apenas em telas mobile */}
        <div
          className={`col-lg-3 d-lg-none ${
            menuOpen ? "d-block" : "d-none"
          } bg-menu-mob`}
        >
          <ul className="list-unstyled">
            <li className="lista-crud-da-aplicacao">
              <Link to="#">
                <img src="img/logo-marca-gerenciamento.png" alt="" />
              </Link>
            </li>
            <li className="lista-crud-da-aplicacao">
              <Link to="#">Produto</Link>
            </li>
            <li className="lista-crud-da-aplicacao">
              <Link to="#">Atualizar</Link>
            </li>
            <li className="lista-crud-da-aplicacao">
              <Link to="#">Pesquisar</Link>
            </li>
            <li className="lista-crud-da-aplicacao">
              <Link to="#">Adicionar</Link>
            </li>
          </ul>
        </div>
        <div className="col-lg-2 d-none d-lg-block section-edition">
          <ul className="list-unstyled">
            <li className="lista-crud-da-aplicacao">
              <Link to="#">
                <img src="img/logo-marca-gerenciamento.png" alt="" />
              </Link>
            </li>
            <li className="lista-crud-da-aplicacao">
              <Link to="#">Produto</Link>
            </li>
            <li className="lista-crud-da-aplicacao">
              <Link to="#">Atualizar</Link>
            </li>
            <li className="lista-crud-da-aplicacao">
              <Link to="#">Pesquisar</Link>
            </li>
            <li className="lista-crud-da-aplicacao">
              <Link to="#">Adicionar</Link>
            </li>
          </ul>

          <ul style={{ padding: "0px" }} className="sair-gerenciamento mt-5">
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
                  className="me-1"
                />
                Sair
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-lg-10">
          <h1>Gerenciamento</h1>
          <p>Aqui está o conteúdo de gerenciamento.</p>
        </div>
      </div>
    </div>
  );
};

export default Gerenciamento;
