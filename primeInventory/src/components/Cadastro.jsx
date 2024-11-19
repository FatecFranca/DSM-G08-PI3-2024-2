
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/cadastro.css'; 
import IMask from 'imask';


const Cadastro = () => {
  React.useEffect(() => {
    const cpf = document.getElementById('cpf');
    if (cpf) {
      IMask(cpf, { mask: '000.000.000-00' });
    }
  }, []);

  return (
    <main>
      <div className="container-xxl">
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <p className="texto-marca">O seu banco de dados, sob controle.</p>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-12" id="caixacadastro">
            <h2 className="text-center">Faça seu cadastro</h2>

            <form className="form-group" action="http://localhost:8080/api/users/register" method="post">

              <div className="col-12 mb-4">
                <label  htmlFor="newEmail">
                  E-mail:
                </label>
                <input className="form-control" type="email" id="email" name="email" required />
              </div>

              <div className="col-12 mb-4">
                <label className="" htmlFor="newSenha">
                  Senha:
                </label>
                <input className="form-control" type="password" id="senha" name="senha" required />
              </div>

              <div className="col-12 mb-4">
                <label className="" htmlFor="newName">
                  Nome completo:
                </label>
                <input className="form-control" type="text" id="nome" name="nome" required />
              </div>

              <div className="col-12 mb-4">
                <label className="" htmlFor="cpfInput">
                  CPF:
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="cpf"
                  name="cpf"
                  maxLength="14"
                  required
                />
              </div>

              <div className="d-flex justify-content-center mt-5">
                <button className="botao-confirm-cadastro" type="submit">
                  Confirmar
                </button>
              </div>

              
             
            </form>
          </div>
        </div>

        <div className="row">
        <div className="col-12 text-center">
            <p className='text-confirm'>Ao clicar em &quot;Confirmar&quot; acima, você reconhece que concorda em ficar vinculado aos Termos da PrimeInventory</p>
        </div>
          <div className="col-12 d-flex gap-3 justify-content-center">
            <p>Já tem uma conta PrimeInv? </p>
            <a href="/login" style={{ color: '#009AED', fontWeight: 600, cursor: 'pointer' }}>
                Conecte-se
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cadastro;
