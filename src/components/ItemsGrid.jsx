import { useState, useEffect } from 'react';
import ItemView from './ItemView';
import { getAll } from '../services/items';

const ItemsGrid = ({ items }) => {
  const [itemsToRender, setItemsToRender] = useState(items);
  const [loading, setLoading] = useState(true);

  console.log('- items props: ', items)

  useEffect(() => {
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
  }, [items]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
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