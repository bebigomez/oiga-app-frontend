import { Link } from "react-router-dom"
import { formatToGuarani } from '../utils'

const ItemView = ({ item }) => {
  return (
    <div className="p-4">
      <Link to={`${item.id}`}>
        <img
          src={item.imageUrls[0]}
          alt={item.name}
          className="w-full mb-2 rounded-xl"
        />
      </Link>
      <Link
        to={`${item.id}`}
        className="text-gray-800 font-roboto-condensed font-bold md:text-2xl"
      >
        {item.name}
      </Link>
      <div className="text-gray-800 font-roboto-condensed md:text-2xl">
        ₲ {formatToGuarani(item.price)}
      </div>
    </div>
  )
}

export default ItemView
