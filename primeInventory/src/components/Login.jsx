import { Link } from 'react-router-dom';
import 'tiny-slider/dist/tiny-slider.css';

import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  return (
    <div>
      <header id="navBar">
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <a className="navbar-brand" href="/front-end/index.html">
              <img
                src="/front-end/img/PrimeInventory2 1.png"
                alt="Logo da PrimeInventory"
                className="img-fluid"
              />
            </a>
          </div>
        </nav>
      </header>

      <main>
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <img
                className="img-fluid logo-marca"
                src="/front-end/img/PrimeInventory2.svg"
                alt="Logo"
              />
            </div>
            <div className="col-12 d-flex justify-content-center">
              <p className="texto-marca">O seu estoque, sob controle.</p>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="forms-login">
                <div className="row justify-content-center">
                  <div className="col-12">
                    <h4 className="text-center">Faça seu login</h4>
                  </div>
                  <div className="col-12 col-lg-6">
                    <form action="/login" method="post">
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="senha" className="form-label">
                          Senha
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="senha"
                          name="senha"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="botao-loguin w-100 d-flex justify-content-center"
                        value="login"
                      >
                        Continuar
                      </button>
                      <p>
                        Ainda não tem uma conta PrimeInv?{' '}
                        <Link to="/cadastro" style={{ color: '#009AED' }}>
                          <strong>Inscreva-se agora</strong>
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"></script>
    </div>
  );
};

export default Login;
