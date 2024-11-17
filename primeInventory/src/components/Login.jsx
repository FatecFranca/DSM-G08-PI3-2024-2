import { Link } from 'react-router-dom';
import 'tiny-slider/dist/tiny-slider.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/login.css'


const Login = () => {
  return (
    <div>
      <main>
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <p className="texto-marca">O seu banco de dados, sob controle</p>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="forms-login ">
                <div className="row justify-content-center">
                  <div className="col-12 col-lg-6 bg-forms mt-5">
                    <div className="col-12 mt-3">
                      <h4 className="text-center">Faça seu login</h4>
                    </div>
                    <form action="/login" method="post">
                      <div className="mb-5">
                        <label htmlFor="email" className="form-label">
                          Email:
                        </label>
                        <input
                          type="email"
                          className="form-control "
                          id="email"
                          name="email"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="senha" className="form-label">
                          Senha:
                        </label>
                        <input
                          type="password"
                          className="form-control mb-5"
                          id="senha"
                          name="senha"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="botao-loguin w-100 d-flex justify-content-center mb-4"
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
