import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "tiny-slider/dist/tiny-slider.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/gerenciamento.css";
import Loader from "./Loader";
import { toast } from "react-toastify";toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImprimirProdutos from "./ImprimirProdutos";


const userId = localStorage.getItem("userId");

const Gerenciamento = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [produtos, setProdutos] = useState([]); // Estado para armazenar os produtos
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    quantidade: "",
    preco: "",
    status: "ativo",
    usuarioId: "",
  });
  const handleLogout = () => {
    localStorage.removeItem("userId")
    toast.info("Você foi desconectado.", {
      position: "top-right",
      autoClose: 1000,
    });
    setTimeout(() => {
      navigate("/login"); // Redireciona para a página de login
    }, 1500);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      setTimeout(() => {
        navigate("/login", { state: { from: "gerenciamento" } });
      }, 2000);
    } else {
      fetchProdutos(userId); // Chama fetchProdutos com userId
    }
  }, [navigate]);
  

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3800);
    return () => clearTimeout(timeout); // Limpeza do timeout
  }, []);

  const fetchProdutos = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/produtos/usuario/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setProdutos(data); // Atualiza o estado com os produtos recebidos
      } else {
        console.error("Erro ao buscar os produtos.");
      }
    } catch (error) {
      console.error("Erro ao conectar-se ao servidor:", error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditar = (id) => {
    const produtoParaEditar = produtos.find((produto) => produto.id === id);
    if (produtoParaEditar) {
      setFormData({
        id: produtoParaEditar.id, // Inclua o ID no formData
        nome: produtoParaEditar.nome,
        descricao: produtoParaEditar.descricao,
        quantidade: produtoParaEditar.quantidade,
        preco: produtoParaEditar.preco,
        status: produtoParaEditar.status,
        usuarioId: produtoParaEditar.usuarioId,
      });
    }
  };
  

  const handleDeletar = async (id) => {
    if (window.confirm("Tem certeza de que deseja deletar este produto?")) {
      try {
        const response = await fetch(`http://localhost:8080/api/produtos/${id}`, {
          method: "DELETE",
        });
  
        if (response.ok) {
          toast.success('Produto deletado com sucesso!', {
            position: 'top-right',
            autoClose: 1000,
          });
          fetchProdutos(userId); // Atualiza a lista de produtos após deletar
        } else {
          alert("Erro ao deletar o produto.");
        }
      } catch (error) {
        console.error("Erro ao conectar-se ao servidor:", error);
        alert("Erro ao deletar o produto.");
      }
    }
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quantityAsInt = parseInt(formData.quantidade, 10);
    const priceAsFloat = parseFloat(formData.preco);
    if (isNaN(quantityAsInt) || isNaN(priceAsFloat)) {
      alert("Quantidade ou preço devem ser números válidos.");
      return;
    }
  
    const usuarioId = localStorage.getItem("userId");
    if (!usuarioId) {
      alert("Usuário não autenticado. Faça login para continuar.");
      return;
    }
  
    const updatedFormData = {
      ...formData,
      quantidade: quantityAsInt,
      preco: priceAsFloat,
      usuarioId: usuarioId,
    };
  
    try {
      const method = formData.id ? "PUT" : "POST";
      const url = formData.id
        ? `http://localhost:8080/api/produtos/${formData.id}`
        : "http://localhost:8080/api/produtos";
  
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });
  
      if (response.ok) {
        toast.success('Operação realizada com sucesso!', {
          position: 'top-right',
          autoClose: 1000,
        });
        setFormData({
          id: "", // Limpa o ID
          nome: "",
          descricao: "",
          quantidade: "",
          preco: "",
          status: "ativo",
          usuarioId: "",
        });
        fetchProdutos(userId); // Atualiza a lista de produtos
      } else {
        const errorData = await response.json();
        console.error(errorData);
        alert("Erro ao processar a operação.");
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

          <ul className="mt-5 d-flex p-0">
          <li className="nav-link">
          
          <ImprimirProdutos produtos={produtos}/>

          </li>
          </ul>
          


          <ul style={{ padding: "0px" }} className="sair-gerenciamento mt-5">
            {" "}
            <li className="nav-item">
              {" "}
              <Link className="nav-link"    onClick={handleLogout} >
                {" "}
                
                <img
                   
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

        <div className="col-lg-10 section-gerenciamento">
          <h2>Produtos cadastrados</h2>
          {produtos.length === 0 ? (
            <p>Nenhum produto cadastrado ainda.</p>
          ) : (
            <ul>
              {produtos.map((produto) => (
                <li key={produto.id}>
                  Produto: {produto.nome.charAt(0).toUpperCase() + produto.nome.slice(1).toLowerCase()} - 
                  Descrição: {produto.descricao.charAt(0).toUpperCase() + produto.descricao.slice(1).toLowerCase()} - 
                  Preço: R${produto.preco} - Quantidade: {produto.quantidade}
                  <button className="editar" onClick={() => handleEditar(produto.id)}>Editar</button>
                  <button className="deletar" onClick={() => handleDeletar(produto.id)}>Deletar</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <ToastContainer />

    </div>
  );
};

export default Gerenciamento;
