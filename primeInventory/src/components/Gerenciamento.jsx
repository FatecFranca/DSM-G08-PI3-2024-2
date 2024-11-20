import { useState } from "react";
import { Link } from "react-router-dom";
import "tiny-slider/dist/tiny-slider.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/gerenciamento.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Gerenciamento = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    quantidade: "",
    preco: "",
    status: "ativo",
    usuarioId: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setTimeout(() => {
        navigate("/login", { state: { from: "gerenciamento" } });
      }, 2000);
    }
  }, [navigate]);
  const handleLogout = () => {
    // Remove o ID do usuário da sessão
    localStorage.removeItem("userId");
  
    // Redireciona para a página inicial ou de login
    navigate("/", { replace: true });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3800);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Garantir que a quantidade seja do tipo inteiro e o preço seja float
    const quantityAsInt = parseInt(formData.quantidade, 10);
    const priceAsFloat = parseFloat(formData.preco);
  
    if (isNaN(quantityAsInt) || isNaN(priceAsFloat)) {
      alert("Quantidade ou preço devem ser números válidos.");
      return;
    }
  
    // Obtenha o ID do usuário armazenado no localStorage
    const usuarioId = localStorage.getItem("userId");
  
    // Se não houver um usuarioId, exiba um erro
    if (!usuarioId) {
      alert("Usuário não autenticado. Faça login para continuar.");
      return;
    }
  
    // Atualizar os dados do produto com a quantidade, preço e usuarioId
    const updatedFormData = {
      ...formData,
      quantidade: quantityAsInt,
      preco: priceAsFloat,
      usuarioId: usuarioId, // Vincula o produto ao usuário logado
    };
  
    console.log("Dados enviados:", updatedFormData);  // Para depuração
  
    try {
      const response = await fetch("http://localhost:8080/api/produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });
  
      if (response.ok) {
        toast.success('Produto cadastrado com sucesso', {
          position: 'top-right',
          autoClose: 1000,
        });

              setFormData({
          nome: "",
          descricao: "",
          quantidade: "",
          preco: "",
          status: "ativo",
          usuarioId: "",
        });
      } else {
        const errorData = await response.json();
        console.error(errorData);
        toast.warning('Produto Não cadastrado! Verifique os campos', {
          position: 'top-right',
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao conectar-se ao servidor.");
    }
  };
  
  


  if (isLoading) {
    return <Loader />;
  }

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
        </div>

        <div className="col-lg-2 d-none d-lg-block section-edition">
          {/* Formulário de cadastro */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">
                Nome:
              </label>
              <input
                type="text"
                className="form-control"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="descricao" className="form-label">
                Descrição:
              </label>
              <input
                type="text"
                className="form-control"
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="quantidade" className="form-label">
                Quantidade:
              </label>
              <input
                type="number"
                className="form-control"
                id="quantidade"
                name="quantidade"
                value={formData.quantidade}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="preco" className="form-label">
                Preço:
              </label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                id="preco"
                name="preco"
                value={formData.preco}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Adicionar
            </button>
          </form>

          <ul style={{ padding: "0px" }} className="sair-gerenciamento mt-5">
            {" "}
            <li className="nav-item">
              {" "}
              <Link className="nav-link"  onClick={handleLogout} >
                {" "}
                <img
                 onClick={handleLogout}
                  src="img/icon-sair.png"
                  alt="Logout Icon"
                  style={{
                    maxWidth: "20px",
                    filter: "invert(1)",
                    mixBlendMode: "difference",
                  }}
                  className="me-1"
                />{" "}
                Sair{" "}
              </Link>{" "}
            </li>{" "}
          </ul>
        </div>

        <div className="col-lg-10">
          <h1>Gerenciamento</h1>
          <p>Aqui está o conteúdo de gerenciamento.</p>
        </div>
      </div>
      <ToastContainer />

    </div>
    
  );
};

export default Gerenciamento;
