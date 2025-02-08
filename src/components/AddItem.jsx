import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ItemPreview from './ItemPreview';
import axios from 'axios';

const validationSchema = Yup.object({
  name: Yup.string().required("Nombre es requerido"),
  description: Yup.string().required("Descripción es requerida"),
  gender: Yup.string().required("Género es requerido"),
  age: Yup.string().required("Edad es requerida"),
  type: Yup.string().required("Tipo de artículo es requerido"),
  style: Yup.string().required("Estilo es requerido"),
  season: Yup.string().required("Temporada es requerida"),
  size: Yup.string().required("Tamaño es requerido"),
  condition: Yup.string().required("Estado es requerido"),
});

const api_key = import.meta.env.VITE_API_URL

const AddItemForm = () => {
  const [images, setImages] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      size: "",
      gender: "",
      age: "",
      type: "",
      style: "",
      season: "",
      condition: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values, images);
      handleSubmit(values);
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  console.log('formik .. values.. ', formik.values)

  // Manejo de la carga de imágenes
  const handleImageUpload = (e) => {
    if (e.target.files) {
      setImages((prevImages) => [
        ...prevImages,
        ...Array.from(e.target.files),
      ]);
    }
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
  
    // Agregar los datos del formulario al FormData
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
  
    // Agregar las imágenes al FormData
    images.forEach((image) => {
      formData.append("images", image);  // "images" es el name del campo que esperas en tu backend
    });
  
    try {
      // Enviar el formulario al backend usando axios
      const response = await axios.post(`${api_key}/products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Asegúrate de establecer el tipo de contenido
        }
      });
  
      // Si la respuesta es exitosa
      if (response.status === 201) {
        alert("Artículo agregado con éxito");
        // Maneja la respuesta (puedes limpiar el formulario o redirigir)
      } else {
        alert(response.data.message || "Error al agregar el artículo");
      }
    } catch (error) {
      // Manejo de errores
      alert("Error en la comunicación con el servidor");
      console.error(error);
    }
  };

  return (
    <div className="flex space-x-12 w-8/12 mx-auto p-6">
      {/* Formulario */}
      <form onSubmit={formik.handleSubmit} className="w-2/5 space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Sube tu artículo</h2>

        {/* Imágenes */}
        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">Imágenes</label>
          <input
            id="images"
            name="images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-4 flex gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image) || "/placeholder.svg"}
                  alt={`Uploaded ${index + 1}`}
                  className="h-24 w-24 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Nombre */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-sm text-red-500 mt-1">{formik.errors.name}</div>
          )}
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio</label>
          <input
            id="price"
            name="price"
            type="text"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.price && formik.errors.price && (
            <div className="text-sm text-red-500 mt-1">{formik.errors.price}</div>
          )}
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rows="2"
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.description && formik.errors.description && (
            <div className="text-sm text-red-500 mt-1">{formik.errors.description}</div>
          )}
        </div>

         {/* Tamaño */}
         <div>
          <label htmlFor="size" className="block text-sm font-medium text-gray-700">Tamaño</label>
          <input
            id="size"
            name="size"
            type="text"
            value={formik.values.size}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.size && formik.errors.size && (
            <div className="text-sm text-red-500 mt-1">{formik.errors.size}</div>
          )}
        </div>

        {/* Género */}
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Género</label>
          <select
            id="gender"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecciona un género</option>
            <option value="1">Femenino</option>
            <option value="2">Masculino</option>
            <option value="3">Unisex</option>
          </select>
          {formik.touched.gender && formik.errors.gender && (
            <div className="text-sm text-red-500 mt-1">{formik.errors.gender}</div>
          )}
        </div>

        {/* Edad */}
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">Edad</label>
          <select
            id="age"
            name="age"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecciona una age</option>
            <option value="1">Adultos</option>
            <option value="1">Adolescentes</option>
            <option value="2">Infantil</option>
            <option value="3">Bebés</option>
          </select>
          {formik.touched.age && formik.errors.age && (
            <div className="text-sm text-red-500 mt-1">{formik.errors.age}</div>
          )}
        </div>

        {/* Tipo de artículo */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipo de artículo</label>
          <input
            id="type"
            name="type"
            type="text"
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.type && formik.errors.type && (
            <div className="text-sm text-red-500 mt-1">{formik.errors.type}</div>
          )}
        </div>

        {/* Estilo */}
        <div>
          <label htmlFor="style" className="block text-sm font-medium text-gray-700">Estilo</label>
          <select
            id="style"
            name="style"
            value={formik.values.style}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecciona un style</option>
            <option value="1">Casual</option>
            <option value="2">Formal</option>
            <option value="3">Deportivo</option>
          </select>
          {formik.touched.style && formik.errors.style && (
            <div className="text-sm text-red-500 mt-1">{formik.errors.style}</div>
          )}
        </div>

        {/* Temporada */}
        <div>
          <label htmlFor="season" className="block text-sm font-medium text-gray-700">Temporada</label>
          <select
            id="season"
            name="season"
            value={formik.values.season}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecciona una season</option>
            <option value="1">Invierno</option>
            <option value="2">Verano</option>
          </select>
          {formik.touched.season && formik.errors.season && (
            <div className="text-sm text-red-500 mt-1">{formik.errors.season}</div>
          )}
        </div>

        {/* Estado */}
        <div>
          <label htmlFor="condition" className="block text-sm font-medium text-gray-700">Estado</label>
          <select
            id="condition"
            name="condition"
            value={formik.values.condition}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecciona un estado</option>
            <option value="1">Buen estado</option>
            <option value="2">Como nuevo</option>
            <option value="3">Nuevo</option>
          </select>
          {formik.touched.condition && formik.errors.condition && (
            <div className="text-sm text-red-500 mt-1">{formik.errors.condition}</div>
          )}
        </div>

        

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Subir artículo
          </button>
        </div>
      </form>

      {/* Previsualización */}
      <ItemPreview formik={formik} images={images} />
    </div>
  );
};

export default AddItemForm;
