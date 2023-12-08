// api.js




export const deleteItem = async (itemId, setItems) => {
    try {
      // Kirim permintaan DELETE ke server untuk menghapus item berdasarkan itemId
      const response = await fetch(`http://localhost:5001/api/deleteItem/${itemId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete item with ID ${itemId}`);
      }
  
      // Perbarui state items setelah item dihapus
      setItems(prevItems => prevItems.filter(item => item.id !== itemId));
      console.log(`Item with ID ${itemId} deleted successfully.`);
    } catch (error) {
      console.error('Error:', error);
    }
};

export const addItem = async (gameName, itemName, itemDetails, selectedImage, setItems) => {
    try {
      const formData = new FormData();
      formData.append('gameName', gameName);
      formData.append('itemName', itemName);
      formData.append('itemDetails', itemDetails);
      formData.append('image', selectedImage);
  
      const response = await fetch('http://localhost:5001/api/addItem', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to add item');
      }
  
      await response.json(); // Hapus atau gunakan data jika diperlukan
      setItems(prevItems => [...prevItems, { game_name: gameName, item_name: itemName, item_details: itemDetails }]);
      console.log('Item added successfully.');
    } catch (error) {
      console.error('Error:', error);
    }
};

export const addItemVariant = async (itemId, nominal, price) => {
    try {
      const response = await fetch('http://localhost:5001/api/addItemVariant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId,
          nominal,
          price,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add item variant');
      }
  
      const data = await response.json();
      console.log('Item variant added successfully:', data);
  
      // Anda dapat mengembalikan data jika diperlukan
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error; // Anda dapat mengembalikan atau menangani kembali error di sini
    }
  };
