import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../reducers/cartReducer';
import { formatPrice } from '../utils';
import axios from 'axios';

const ProductDetails = () => {
  const id = useParams().id;

  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState(null);
  const [item, setItem] = useState(null);

  // if (!item) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <p className="text-xl font-semibold text-gray-900">Loading...</p>
  //     </div>
  //   );
  // }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/products/${id}`);
        console.log('response... ', response.data)
        setItem(response.data);  // Actualizamos el estado con el producto recibido
      } catch (err) {
        console.error(err);  // En caso de error
      }
    };

    fetchProduct();  // Llamamos a la función para obtener el producto
  }, [id]);  // Dependencias: se ejecuta cuando cambia el id o el item

  return (
    item && (
      <section className="grid md:grid-cols-2 md:justify-center">
        <div className="bg-gray-500">
        <img src={item.imageUrls[0]} alt="Product" className="max-w-full" />
      </div>

        <div className="flex flex-col justify-start p-6 md:p-10">
          <h2 className="text-xl md:text-3xl font-semibold mb-4 text-gray-900">
            {item.name}
          </h2>
          <p className="text-gray-900 md:text-2xl mb-4">${formatPrice(item.price)}</p>
          <p className="text-gray-900 md:text-2xl mb-4">Tamaño: {item.size}</p>

          <button
            className="bg-black md:text-xl text-white py-2 px-4 rounded"
            onClick={() => {
              dispatch(addItem({ item }))
            }}
          >
            Add to cart
          </button>
        </div>
      </section>
    )
  );
};

export default ProductDetails;
