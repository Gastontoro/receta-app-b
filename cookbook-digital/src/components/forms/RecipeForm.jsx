// src/components/forms/RecipeForm.jsx

import { useForm } from 'react-hook-form';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';

// Prop: `initialData` contendrá la receta si estamos editando
function RecipeForm({ initialData = {}, onSubmit, isEditing }) { 
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData // Carga datos iniciales para edición
  });

  const formTitle = isEditing ? "Editar Receta" : "Crear Nueva Receta";

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2>{formTitle}</h2>

      {/* Campo Nombre */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">Nombre</Form.Label>
        <Col sm="10">
          <Form.Control 
            type="text" 
            placeholder="Ej: Pasta Carbonara"
            {...register("nombre", { required: "El nombre es obligatorio" })}
            isInvalid={!!errors.nombre}
          />
          <Form.Control.Feedback type="invalid">{errors.nombre?.message}</Form.Control.Feedback>
        </Col>
      </Form.Group>

      {/* Campo Tiempo de Preparación */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">Tiempo (min)</Form.Label>
        <Col sm="4">
          <Form.Control 
            type="number" 
            placeholder="30"
            {...register("tiempoPreparacion", { 
              required: "El tiempo es obligatorio",
              min: { value: 1, message: "Debe ser mayor que 0" }
            })}
            isInvalid={!!errors.tiempoPreparacion}
          />
          <Form.Control.Feedback type="invalid">{errors.tiempoPreparacion?.message}</Form.Control.Feedback>
        </Col>
      
        {/* Campo Dificultad */}
        <Form.Label column sm="2">Dificultad</Form.Label>
        <Col sm="4">
          <Form.Select 
            {...register("dificultad", { required: "La dificultad es obligatoria" })}
            isInvalid={!!errors.dificultad}
          >
            <option value="">Selecciona...</option>
            <option value="Fácil">Fácil</option>
            <option value="Media">Media</option>
            <option value="Difícil">Difícil</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.dificultad?.message}</Form.Control.Feedback>
        </Col>
      </Form.Group>

      {/* Campo Instrucciones */}
      <Form.Group className="mb-3">
        <Form.Label>Instrucciones</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={5} 
          placeholder="Pasos detallados..."
          {...register("instrucciones", { required: "Las instrucciones son obligatorias" })}
          isInvalid={!!errors.instrucciones}
        />
        <Form.Control.Feedback type="invalid">{errors.instrucciones?.message}</Form.Control.Feedback>
      </Form.Group>

      {/* NOTA: Simplificado: El campo ingredientes es un string separado por comas */}
      <Form.Group className="mb-3">
        <Form.Label>Ingredientes (separados por comas)</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Ej: tomate, cebolla, sal, aceite"
          {...register("ingredientes")}
        />
      </Form.Group>
      
      <Button variant="primary" type="submit" className="w-100 mt-3">
        {isEditing ? "Guardar Cambios" : "Crear Receta"}
      </Button>
    </Form>
  );
}

export default RecipeForm;