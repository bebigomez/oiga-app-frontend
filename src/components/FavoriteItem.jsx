import { Link } from "react-router-dom"
import { formatToGuarani } from "../utils"

const FavoriteItem = ({ item }) => {
  return (
    <Link
      to={`product/${item.id}`}
    >
      <div key={item.id} className="rounded-xl shadow-md">
        <div>
          <img className="mb-2 rounded-t-xl" src={item.imageUrls[0]}></img>
        </div>
        <div className="space-y-2 p-2">
          <p
            className="text-base font-roboto-condensed font-semibold"
          >
            {item.name}
          </p>
          <p className="text-sm">₲ {formatToGuarani(item.price)}</p>
        </div>
      </div>
    </Link>
  )
}

export default FavoriteItem