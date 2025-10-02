// src/components/common/RecipeCard.jsx

import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <Card.Title>{recipe.nombre}</Card.Title>
        <Card.Text>
          <small className="text-muted">
            🕒 {recipe.tiempoPreparacion} min | Dificultad: **{recipe.dificultad}**
          </small>
        </Card.Text>
        <Link to={`/receta/${recipe.id}`}>
          <Button variant="outline-primary">Ver Detalles</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
export default RecipeCard;