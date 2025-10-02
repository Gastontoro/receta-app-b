// src/pages/FormPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RecipeForm from '../components/forms/RecipeForm';
import { getRecipe, addRecipe, updateRecipe } from '../api/recipesApi';
import { Alert, Spinner } from 'react-bootstrap';

function FormPage() {
  const { id } = useParams(); // Obtiene el ID si estamos en /editar/:id
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(id ? true : false);
  const [error, setError] = useState(null);
  const isEditing = !!id; // True si hay ID

  useEffect(() => {
    if (isEditing) {
      const fetchRecipe = async () => {
        try {
          const data = await getRecipe(id);
          if (data) {
            setInitialData(data);
          } else {
            setError("Receta no encontrada.");
          }
        } catch (err) {
          setError("Error al cargar la receta.");
        } finally {
          setLoading(false);
        }
      };
      fetchRecipe();
    }
  }, [id, isEditing]);

  const handleSubmit = async (formData) => {
    try {
      // Prepara datos: convierte el string de ingredientes en un array (si existe)
      const dataToSend = {
        ...formData,
        ingredientes: formData.ingredientes ? formData.ingredientes.split(',').map(item => item.trim()) : [],
        // Asegura que el tiempo es un número para la BD
        tiempoPreparacion: Number(formData.tiempoPreparacion) 
      };

      if (isEditing) {
        await updateRecipe(id, dataToSend);
        alert("Receta actualizada con éxito.");
        navigate(`/receta/${id}`);
      } else {
        const newDocRef = await addRecipe(dataToSend);
        alert("Receta creada con éxito.");
        navigate(`/receta/${newDocRef.id}`);
      }
    } catch (err) {
      setError(`Error al ${isEditing ? 'actualizar' : 'crear'} la receta.`);
      console.error(err);
    }
  };

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  if (error && isEditing) return <Alert variant="danger">{error}</Alert>;


  return (
    <RecipeForm
      initialData={initialData || undefined} // Pasa undefined si no hay datos iniciales
      onSubmit={handleSubmit}
      isEditing={isEditing}
    />
  );
}

export default FormPage;