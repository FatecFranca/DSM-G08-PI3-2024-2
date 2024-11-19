// src/App.jsx
import { useLocation } from 'react-router-dom'; // Importando useLocation do react-router-dom
import 'tiny-slider/dist/tiny-slider.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from './routes/AppRoutes'; 
import Header from './components/Header'; 
import InformacoesPlataforma, { InformacoesEmpresa } from './components/Page';
import 'react-toastify/dist/ReactToastify.css';
import Notification from './components/Notification';

import './styles/navbar.css';
import './styles/home.css';

const App = () => {
  const location = useLocation(); 

  return (
    <>
      <Header />
      <AppRoutes />
      {location.pathname !== '/login' && location.pathname !== '/cadastro' && location.pathname !== '/gerenciamento' && (
        <>
          <InformacoesPlataforma />
          <InformacoesEmpresa />
          <ToastContainer />
          <Notification/>




        </>
      )}
    </>
  );
};

export default App;
