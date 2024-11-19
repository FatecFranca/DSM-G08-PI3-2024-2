import React from 'react';
import '../styles/loader.css';


const Loader = () => {
  return (
    <div className="loader-overlay">
                                <img  src="img/logo-marca-login.svg" alt=""  className='loader-image'/>

      <div className="loader">
      </div>
      
    </div>
  );
};

export default Loader;
