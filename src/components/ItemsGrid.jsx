import { useState, useEffect } from 'react';
import ItemView from './ItemView';
import { getAll } from '../services/items';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Accordion from './Accordion';

const ItemsGrid = ({ items: initialItems }) => {
  const [allItems, setAllItems] = useState(initialItems || []);
  const [itemsToRender, setItemsToRender] = useState(initialItems || []);
  const [loading, setLoading] = useState(!initialItems); // Solo si no se pasan items iniciales

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!initialItems) {
      setLoading(true);
      getAll()
        .then((response) => {
          setAllItems(response.data);
          setItemsToRender(response.data); // Aplicar sin filtros al inicio
        })
        .catch((error) => console.error('Error fetching items:', error))
        .finally(() => setLoading(false));
    }
  }, [initialItems]);

  useEffect(() => {
    if (initialItems) {
      setAllItems(initialItems);
      setItemsToRender(initialItems);
    }
  }, [initialItems]);

  useEffect(() => {
    if (allItems.length > 0) {
      applyFilters();
    }
  }, [searchParams, allItems]);

  const typeOptions = [...new Set(initialItems.map((item) => item.type))];

  const applyFilters = () => {
    const gender = searchParams.get("genero");
    const age = searchParams.get("edad");
    const type = searchParams.get("tipo");
    const style = searchParams.get("estilo");
    const season = searchParams.get("temporada");
    const condition = searchParams.get("estado");

    let filteredItems = [...allItems];

    if (gender && !isNaN(Number(gender))) {
      filteredItems = filteredItems.filter(item => item.gender_id === Number(gender));
    }

    if (age && !isNaN(Number(age))) {
      filteredItems = filteredItems.filter(item => item.age_id === Number(age));
    }

    if (type) {
      filteredItems = filteredItems.filter(item => item.type === type);
    }

    if (style && !isNaN(Number(style))) {
      filteredItems = filteredItems.filter(item => item.style_id === Number(style));
    }

    if (condition && !isNaN(Number(condition))) {
      filteredItems = filteredItems.filter(item => item.condition_id === Number(condition));
    }

    if (season && !isNaN(Number(season))) {
      filteredItems = filteredItems.filter(item => item.season_id === Number(season));
    }

    setItemsToRender(filteredItems);
  };


  const updateFilter = (key, value, isCheckbox = false) => {
    const params = new URLSearchParams(searchParams);

    if (isCheckbox) {
      let selectedValues = params.get(key) ? params.get(key).split(",") : [];
      if (selectedValues.includes(value)) {
        selectedValues = selectedValues.filter((v) => v !== value);
      } else {
        selectedValues.push(value);
      }
      if (selectedValues.length > 0) {
        params.set(key, selectedValues.join(","));
      } else {
        params.delete(key);
      }
    } else {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }

    navigate(`/articulos?${params.toString()}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='flex justify-center'>

        <div className='w-full mx-4 flex flex-col md:flex-row'>
          <div className='md:w-1/2'>
            <Accordion title={"ORDENAR"}>
              <div>
                <h3>Género:</h3>
                {[
                  { id: "1", label: "Mujer" },
                  { id: "2", label: "Hombre" },
                  { id: "3", label: "Unisex" },
                ].map((option) => (
                  <label key={option.id} className="block">
                    <input
                      type="checkbox"
                      value={option.id}
                      checked={searchParams.get("genero")?.split(",").includes(option.id) || false}
                      onChange={(e) => updateFilter("genero", e.target.value, true)}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </Accordion>
          </div>

          {/* <hr className='md:hidden'></hr> */}

          <div className='md:w-1/2'>
          
          <Accordion title={"FILTRAR"}>
            <Accordion title={'Género'}>
              {[
                { id: "1", label: "Mujer" },
                { id: "2", label: "Hombre" },
                { id: "3", label: "Unisex" },
              ].map((option) => (
                <label key={option.id} className="block">
                  <input
                    type="checkbox"
                    value={option.id}
                    checked={searchParams.get("genero")?.split(",").includes(option.id) || false}
                    onChange={(e) => updateFilter("genero", e.target.value, true)}
                  />
                  {option.label}
                </label>
              ))}
            </Accordion>

            <div className='flex-col'>
              <Accordion title={'Edad'}>
                <div className='flex flex-col'>
                  <h3>Edad:</h3>
                  {[
                    { id: "1", label: "Adulto" },
                    { id: "2", label: "Adolescente" },
                    { id: "3", label: "Infantil" },
                    { id: "4", label: "Bebés" },
                  ].map((option) => (
                    <label key={option.id} className="block">
                      <input
                        type="checkbox"
                        value={option.id}
                        checked={searchParams.get("edad")?.split(",").includes(option.id) || false}
                        onChange={(e) => updateFilter("edad", e.target.value, true)}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </Accordion>

              <Accordion title={'Tipo de producto'}>
                <div className="flex flex-col">
                  <h3>Tipo de Producto:</h3>
                  {typeOptions.map((tipo) => (
                    <label key={tipo} className="block">
                      <input
                        type="checkbox"
                        value={tipo}
                        checked={searchParams.get("tipo")?.split(",").includes(tipo) || false}
                        onChange={(e) => updateFilter("tipo", e.target.value, true)}
                      />
                      {tipo}
                    </label>
                  ))}
                </div>
              </Accordion>

              <Accordion title={'Estilo'}>
                <div className='flex flex-col'>
                  <h3>Estilo:</h3>
                  {[
                    { id: "1", label: "Casual" },
                    { id: "2", label: "Formal" },
                    { id: "3", label: "Deportivo" },
                  ].map((option) => (
                    <label key={option.id} className="block">
                      <input
                        type="checkbox"
                        value={option.id}
                        checked={searchParams.get("estilo")?.split(",").includes(option.id) || false}
                        onChange={(e) => updateFilter("estilo", e.target.value, true)}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </Accordion>

              <Accordion title={'Temporada'}>
                <div className='flex flex-col'>
                  <h3>Temporada:</h3>
                  {[
                    { id: "1", label: "Invierno" },
                    { id: "2", label: "Verano" },
                  ].map((option) => (
                    <label key={option.id} className="block">
                      <input
                        type="checkbox"
                        value={option.id}
                        checked={searchParams.get("temporada")?.split(",").includes(option.id) || false}
                        onChange={(e) => updateFilter("temporada", e.target.value, true)}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </Accordion>

              <Accordion title={'Estado'}>
                <div className='flex flex-col'>
                  <h3>Estado:</h3>
                  {[
                    { id: "1", label: "Buen estado" },
                    { id: "2", label: "Como nuevo" },
                    { id: "3", label: "Nuevo" },
                  ].map((option) => (
                    <label key={option.id} className="block">
                      <input
                        type="checkbox"
                        value={option.id}
                        checked={searchParams.get("estado")?.split(",").includes(option.id) || false}
                        onChange={(e) => updateFilter("estado", e.target.value, true)}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </Accordion>

            </div>
          </Accordion>
          </div>
        </div>


      </div>


      <div>
        {itemsToRender.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-4 ms-10">
            {itemsToRender.map((item) => (
              <ItemView key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="pt-32 flex justify-center">
            <h3 className="text-black">No se encontraron elementos.</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default ItemsGrid;
