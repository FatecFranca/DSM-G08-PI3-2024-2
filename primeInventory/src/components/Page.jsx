// Page.jsx

import PropTypes from 'prop-types';  // Importando prop-types para validação
import 'tiny-slider/dist/tiny-slider.css'; // Importando estilos externos
import 'bootstrap/dist/css/bootstrap.min.css'; // Estilo do Bootstrap

import '../styles/navbar.css';
import '../styles/home.css';

// Componente Informações Plataforma
const InformacoesPlataforma = () => {
  return (
    <section id="informacoes-plataforma">
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-lg-8">
            <h2>Uma plataforma para gerenciar seu banco de dados em qualquer lugar</h2>
            <div className="row mt-5">
              <Card
                imgSrc="img/caixa1.svg"
                text="Segurança em seu Banco de Dados"
              />
              <Card
                imgSrc="img/caixa2.svg"
                text="Precisão e Rápida Atualização"
              />
              <Card
                imgSrc="img/caixa3.svg"
                text="Controle de Estoque em Tempo Real"
              />
            </div>
          </div>
          <div className="col-4 d-none d-lg-block">
            <div className="logo2">
              <img
                src="img/PrimeInventory2Logo 1.png"
                alt=""
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Componente Card
const Card = ({ imgSrc, text }) => (
  <div className="col-6 col-lg-4 mb-3">
    <div className="card">
      <img src={imgSrc} alt="" className="img-fluid" />
      <div className="card-body">
        <p style={{ textAlign: "center" }}>{text}</p>
      </div>
    </div>
  </div>
);

// Validação de tipos para as props de Card
Card.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

// Componente Informações da Empresa
const InformacoesEmpresa = () => {
  return (
    <section className="informacoes-empresa">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 style={{ textAlign: "center" }}>
              Facilite a administração e controle do seu banco de dados com
              PrimeInventory.
            </h2>
            <p style={{ textAlign: "center" }}>
              Você está enfrentando desafios na gestão do seu banco de dados?
              Não se preocupe mais! Apresentamos a solução definitiva para os
              seus problemas. Com o PrimeInventory, oferecemos um banco de dados
              seguro e facilmente gerenciável diretamente no seu navegador.
              Simplifique suas operações e ganhe eficiência com nossos serviços
              acessíveis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Exporte InformacoesPlataforma como default
export default InformacoesPlataforma; 
export { InformacoesEmpresa };  // Exporte InformacoesEmpresa como named
