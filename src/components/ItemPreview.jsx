import React from 'react'

const ItemPreview = ({ formik, images }) => {
  return (
    <div className="w-3/5 bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        {/* Imágenes */}
        <div className="flex justify-center mb-4">
          {images.length > 0 ? (
            images.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt={`Preview ${index + 1}`}
                className="h-36 w-36 object-cover rounded-lg shadow-md"
              />
            ))
          ) : (
            <div className="h-36 w-36 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Sin imagen</span>
            </div>
          )}
        </div>

        {/* Nombre */}
        <h4 className="text-xl font-semibold text-gray-800">{formik.values.name || "Nombre"}</h4>

        {/* Descripción */}
        <p className="text-sm text-gray-600 mt-2">
          {formik.values.price || "Precio"}
        </p>

        {/* Descripción */}
        <p className="text-sm text-gray-600 mt-2">
          {formik.values.description || "Descripción"}
        </p>
      </div>

      <div className="mt-4 space-y-2">
        {/* Información adicional */}
        <div className="flex flex-col">
          <span><strong>Tamaño:</strong> {formik.values.size || "No seleccionado"}</span>
          <span><strong>Género:</strong> {formik.values.gender || "No seleccionado"}</span>
          <span><strong>Edad:</strong> {formik.values.age || "No seleccionado"}</span>
          <span><strong>Tipo:</strong> {formik.values.type || "No seleccionado"}</span>
          <span><strong>Estilo:</strong> {formik.values.style || "No seleccionado"}</span>
          <span><strong>Temporada:</strong> {formik.values.season || "No seleccionado"}</span>
          <span><strong>Estado:</strong> {formik.values.condition || "No seleccionado"}</span>
        </div>

      </div>
    </div>
  )
}

export default ItemPreview