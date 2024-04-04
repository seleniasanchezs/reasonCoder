import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from "./components/navbar/Nabar";
import { ArticulosProvider } from './components/context/providerArticulos';
import { CarritoFinal } from './components/navbar/carritoFinal';
import { RopaInterior } from './components/jDatos/ropaInterior';
import { TrajesDeBaño } from './components/jDatos/tajesDebaño';
import { app, db } from './firebaseconfiguracion';
import { Inicio } from './components/jDatos/inicio';

function App() {
  return (
    <div className="App">
      <Router>
        <ArticulosProvider>
          <Navbar />
          <Routes>
        
            <Route path="/" element={<Inicio db={db} />} />
            <Route path="/carritoFinal" element={<CarritoFinal />} />
            <Route path="/lenceria" element={<RopaInterior db={db} />} />
            <Route path="/trajedebaño" element={<TrajesDeBaño db={db} />} />
          </Routes>
        </ArticulosProvider>
      </Router>
    </div>
  );
}

export default App;
