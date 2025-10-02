// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
// Importar las páginas que crearás
import RecipeListPage from './pages/RecipeListPage'; 
import RecipeDetailPage from './pages/RecipeDetailPage'; 
import FormPage from './pages/FormPage'; 
import { Container } from 'react-bootstrap';


function App() {
  return (
    <Router>
      <AppNavbar />
      <Container className="mt-4 min-vh-100"> 
        <Routes>
          {/* Ruteo Estático: Listado */}
          <Route path="/" element={<RecipeListPage />} /> 
          
          {/* Ruteo Estático: Crear */}
          <Route path="/crear" element={<FormPage />} /> 

          {/* Ruteo Dinámico: Detalle */}
          <Route path="/receta/:id" element={<RecipeDetailPage />} /> 

          {/* Ruteo Dinámico: Editar */}
          <Route path="/editar/:id" element={<FormPage />} /> 

          {/* Opcional: Ruta 404 */}
          <Route path="*" element={<h1>404: No Encontrado</h1>} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;