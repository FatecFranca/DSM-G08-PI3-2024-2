// src/routes/AppRoutes.jsx
import { Route, Routes } from 'react-router-dom'; // Importando as dependências do react-router-dom
import Login from '../components/Login'; 

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} /> {/* Rota para Login */}
      {/* Outras rotas podem ser configuradas aqui */}
    </Routes>
  );
};

export default AppRoutes;
