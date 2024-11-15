// src/App.jsx

import 'tiny-slider/dist/tiny-slider.css'; // Importando estilos externos
import 'bootstrap/dist/css/bootstrap.min.css'; // Estilo do Bootstrap
import AppRoutes from './routes/AppRoutes'; // Importando as rotas
import Header from './components/Header'; // Importando o Header

import  './styles/navbar.css'
import  './styles/home.css'


const App = () => {
  return (
    <>
      <Header /> {}
      <AppRoutes /> {}
    </>
  );
};

export default App;
