import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdministracaoRestaurantes from './paginas/Administracao/Restaurantes/AdministracaoRestaurantes';
import FormularioRestaurante from './paginas/Administracao/Restaurantes/FormularioRestaurante';
import AdministracaoPratos from './paginas/Administracao/Pratos/AdministracaoPratos';
import FormularioPratos from './paginas/Administracao/Pratos/FormularioPratos';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      
      <Route path="/admin/restaurantes" element={<AdministracaoRestaurantes />} />
      <Route path="/admin/restaurantes/novo" element={<FormularioRestaurante />} />
      <Route path="/admin/restaurantes/:id" element={<FormularioRestaurante />} />
     
     
      <Route path="/admin/pratos" element={<AdministracaoPratos />} />
      <Route path="/admin/pratos/novo" element={<FormularioPratos />} />
      <Route path="/admin/pratos/:id" element={<FormularioPratos />} />



    </Routes>
  );
}

export default App;
