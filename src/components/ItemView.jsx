import { Link } from "react-router-dom"
import { formatToGuarani } from '../utils'

const ItemView = ({ item }) => {
  return (
    <div className="bg-sky-200 h-[640px] rounded-lg shadow-lg">
      <Link to={`${item.id}`} className="flex flex-col h-full">
        
        {/* Contenedor de imagen */}
        <div className="bg-green-500 flex-1 relative overflow-hidden">
          <img
            src={item.imageUrls[0]}
            alt={item.name}
            className="w-full h-full object-cover" // Asegura que la imagen ocupe todo el contenedor sin deformarse
          />
        </div>

        {/* Contenedor de texto */}
        <div className="bg-red-200 p-4">
          <p className="text-gray-800 font-roboto-condensed font-bold text-xl md:text-2xl">
            {item.name}
          </p>

          <p className="text-gray-800 font-roboto-condensed text-lg md:text-2xl">
            ₲ {formatToGuarani(item.price)}
          </p>
        </div>

      </Link>
    </div>
  )
}

export default ItemView
