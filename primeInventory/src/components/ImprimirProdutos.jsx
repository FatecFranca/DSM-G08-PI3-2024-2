import React from "react";
import { toast } from "react-toastify";toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ImprimirProdutos = ({ produtos }) => {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
      
    if (printWindow) {
      toast.info("Você será direcionado para impressão da lista.", {
        position: "top-right",
        autoClose: 15000,
      });
      const productList = produtos.map(
        
        (produto) =>
          `<tr>
            <td>${produto.nome}</td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.preco.toFixed(2)}</td>
            <td>${produto.status}</td>
          </tr>`
      ).join('');

      const htmlContent = `
       <html>
    <head>
      <title>Lista de Produtos</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    </head>
    <body>
      <div class="container mt-4">
        <h1 class="text-center">Lista de Produtos</h1>
        <table class="table table-striped table-bordered">
          <thead class="table-dark">
            <tr>
              <th class="text-center">Nome</th>
              <th class="text-center">Descrição</th>
              <th class="text-center">Quantidade</th>
              <th class="text-center">Preço</th>
              <th class="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            ${productList}
          </tbody>
        </table>
      </div>
    </body>
  </html>
`;
<ToastContainer />

      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <button onClick={handlePrint}  className="btn btn-primary">Imprimir Produtos</button>
  );
};

export default ImprimirProdutos;
