import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IMask from 'imask'; // Importação do IMask
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/cadastro.css';

const Cadastro = () => {
  const navigate = useNavigate(); // Hook para redirecionar
  const [formData, setFormData] = useState({ nome: '', email: '', cpf: '', senha: '' });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Aplicando a máscara no campo CPF
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
      IMask(cpfInput, { mask: '000.000.000-00' });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateCPF = (cpf) => {
    // Remove caracteres não numéricos
    const cleanCPF = cpf.replace(/\D/g, '');
    if (cleanCPF.length !== 11) return false;

    // Validação do CPF (cálculo do dígito verificador)
    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(10, 11))) return false;

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateCPF(formData.cpf)) {
      setErrorMessage('CPF inválido.');
      return;
    }
    try {
      const response = await fetch('https://dsm-g08-pi3-2024-2-backend.onrender.com/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/login'); // Redireciona para gerenciamento após cadastro
      } else {
        const { error } = await response.json();
        setErrorMessage(error || 'Erro ao realizar cadastro');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Erro no servidor');
    }
  };

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
            {errorMessage && <p className="text-danger">{errorMessage}</p>}

            <form className="form-group" onSubmit={handleSubmit}>
              <div className="col-12 mb-4">
                <label htmlFor="email">E-mail:</label>
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12 mb-4">
                <label htmlFor="senha">Senha:</label>
                <input
                  className="form-control"
                  type="password"
                  id="senha"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12 mb-4">
                <label htmlFor="nome">Nome completo:</label>
                <input
                  className="form-control"
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12 mb-4">
                <label htmlFor="cpf">CPF:</label>
                <input
                  className="form-control"
                  type="text"
                  id="cpf"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
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
      </div>
    </main>
  );
};

export default Cadastro;
