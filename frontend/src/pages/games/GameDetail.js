import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ItemVariants from './ItemVariants';

const GameDetail = () => {
  const { name } = useParams();
  const history = useHistory(); // Dapatkan objek history
  const [item, setItem] = useState(null);
  const [variants, setVariants] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState([]);

  useEffect(() => {
    // Fetch item details
    fetch(`http://localhost:5001/api/getItems/${name}`)
      .then(response => response.json())
      .then(data => setItem(data[0]))
      .catch(error => console.error(error));
  }, [name]);

  useEffect(() => {
    // Fetch item variants based on item ID
    if (item) {
      fetch(`http://localhost:5001/api/getItemVariants/${item.id}`)
        .then(response => response.json())
        .then(data => setVariants(data))
        .catch(error => console.error(error));
    }
  }, [item]);

  // Function to handle selecting item variants
  const handleSelectVariant = (variant) => {
    // Check if the variant is already selected
    const isVariantSelected = selectedVariants.some((v) => v.id === variant.id);

    // If selected, remove from the array; otherwise, add it
    if (isVariantSelected) {
      setSelectedVariants(selectedVariants.filter((v) => v.id !== variant.id));
    } else {
      setSelectedVariants([...selectedVariants, variant]);
    }
  };

  // Function to handle the "Proceed to Payment" button click
  const handleProceedToPayment = () => {
    // Navigate to the 'sucses.js' page
    history.push('/sucses');
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{item.game_name}</h1>
      {/* ... other details ... */}
      <ItemVariants variants={variants} onSelectVariant={handleSelectVariant} />
      <button onClick={handleProceedToPayment}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default GameDetail;
