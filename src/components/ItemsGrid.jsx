import { useState, useEffect } from 'react';
import ItemView from './ItemView';
import { getAll } from '../services/items';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ItemsGrid = ({ items }) => {
  const [itemsToRender, setItemsToRender] = useState(items);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const applyFilters = () => {
    const gender = searchParams.get("gender");

    console.log('- applyFilters cuando se monta component');
    console.log('gender param cuando se monta component: ', gender)
    console.log('items cuando se monta component: ', items)

    let filteredItems = [...items];  // Copiamos el array de items

    // for (let i = 0; i < filteredItems.length; i++) {
    //   console.log(typeof filteredItems[i].gender_id);
    // }

    // Filtramos por género
    if (gender) {
      filteredItems = filteredItems.filter((item) => item.gender_id === Number(gender));
    }

    console.log('- filteredItems cuando se monta component: ', filteredItems)

    // Actualizamos el estado con los items filtrados
    setItemsToRender(filteredItems);
  };

  useEffect(() => {
    applyFilters()
  }, [searchParams])

  console.log('- items to render: ', itemsToRender)

  useEffect(() => {
    if (!items) {
      setLoading(true)
      getAll()
        .then((response) => {
          setItemsToRender(response.data);
        })
        .catch((error) => {
          console.error('Error fetching items:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    navigate(`/articulos?${params.toString()}`);
  };

  return (
    <>
      <div className='flex justify-center'>
        <div className='flex-col'>
          <h2 className='text-2xl'>Filters:</h2>
          <label htmlFor="gender-select">Género:</label>

          <select name="gender" id="gender-select" onChange={(e) => { updateFilter("gender", e.target.value) }}>
            <option value="">--Elige una opción--</option>
            <option value="1">Mujer</option>
            <option value="2">Hombre</option>
            <option value="3">Unisex</option>
          </select>
        </div>
      </div>
      <div>
        {itemsToRender.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-4 pt-8">
            {itemsToRender.map((item) => (
              <ItemView key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="pt-32 flex justify-center">
            <h3 className="text-black">No matching items found</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default ItemsGrid;