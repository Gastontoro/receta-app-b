// src/pages/RecipeDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getRecipe, deleteRecipe } from '../api/recipesApi';
import { Container, Card, ListGroup, Button, Alert, Spinner } from 'react-bootstrap';

function RecipeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecipe = async () => {
    try {
      const data = await getRecipe(id);
      if (data) {
        setRecipe(data);
      } else {
        setError("Receta no encontrada.");
      }
    } catch (err) {
      setError("Error al cargar los detalles de la receta.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta receta?")) {
      try {
        await deleteRecipe(id);
        alert("Receta eliminada con éxito.");
        navigate("/");
      } catch (err) {
        setError("Error al eliminar la receta.");
        console.error(err);
      }
    }
  };

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!recipe) return <Alert variant="info">Receta no disponible.</Alert>;


  return (
    <Container className="my-5">
      <Card>
        <Card.Header as="h1">{recipe.nombre}</Card.Header>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            Tiempo: {recipe.tiempoPreparacion} min | Dificultad: **{recipe.dificultad}**
          </Card.Subtitle>
          
          <h4 className="mt-4">Ingredientes</h4>
          <ListGroup variant="flush">
            {(Array.isArray(recipe.ingredientes) ? recipe.ingredientes : []).map((ing, index) => (
              <ListGroup.Item key={index}>- {ing}</ListGroup.Item>
            ))}
          </ListGroup>

          <h4 className="mt-4">Instrucciones</h4>
          <Card.Text style={{ whiteSpace: 'pre-wrap' }}>
            {recipe.instrucciones}
          </Card.Text>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Link to={`/editar/${recipe.id}`}>
              <Button variant="warning">Editar</Button>
            </Link>
            <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
          </div>
        </Card.Body>
      </Card>
      <Link to="/" className="btn btn-outline-secondary mt-3">Volver al Listado</Link>
    </Container>
  );
}

export default RecipeDetailPage;