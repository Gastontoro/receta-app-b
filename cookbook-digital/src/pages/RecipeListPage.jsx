// src/pages/RecipeListPage.jsx

import React, { useState, useEffect } from 'react';
import { getRecipes } from '../api/recipesApi';
import RecipeCard from '../components/common/RecipeCard';
import { Row, Col, Alert, Spinner } from 'react-bootstrap';

function RecipeListPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes();
        setRecipes(data);
      } catch (err) {
        setError("Error al cargar las recetas desde Firebase.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (recipes.length === 0) return <Alert variant="info">No hay recetas. ¡Crea una!</Alert>;

  return (
    <div>
      <h1>Listado de Recetas</h1>
      <Row xs={1} md={2} lg={3} className="g-4 mt-3">
        {recipes.map(recipe => (
          <Col key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default RecipeListPage;