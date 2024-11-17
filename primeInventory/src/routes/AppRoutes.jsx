// src/routes/AppRoutes.jsx
import { Route, Routes } from 'react-router-dom';
import Login from '../components/Login'; 
import Cadastro from '../components/Cadastro'; 
import Gerenciamento from '../components/Gerenciamento'; 

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/gerenciamento" element={<Gerenciamento />} />
    </Routes>
  );
};

export default AppRoutes;
