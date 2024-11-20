import { Link } from 'react-router-dom';
import 'tiny-slider/dist/tiny-slider.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/login.css'
import 'react-toastify/dist/ReactToastify.css';
import Notification from './Notification';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect,useState } from 'react';





const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();




 const handleLoginSuccess = () => {
    toast.success('Login realizado com sucesso! Você está sendo redirecionado para o gerenciamento', {
      position: 'top-right',
      autoClose: 3000,
    });
  };
  const handleLoginError = () => {
    toast.error('Erro ao realizar login. Tente novamente!', {
      position: 'top-right',
      autoClose: 3000,
    });
  };


  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const userData = {
      email: formData.get('email'),
      senha: formData.get('senha'),
    };

    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        handleLoginSuccess();
        const data = await response.json();
        localStorage.setItem('userId', data.userId);
        setTimeout(() => {
          navigate('/gerenciamento');
        }, 4000);
      } else {
        handleLoginError();

        const errorData = await response.json();
      }
    } catch (error) {
      console.error('Erro na conexão:', error);
      alert('Não foi possível conectar ao servidor.');
    }
  };

  

  return  (
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
                    <form  onSubmit={handleLogin}>
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
                    <ToastContainer />
                    <Notification />

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
