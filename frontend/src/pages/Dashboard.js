import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as jwt_decode from "jwt-decode";
import Sidebar from "../components/Dashboard/Sidebar";
import { deleteItem, addItem, addItemVariant } from "../api/api";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [gameName, setGameName] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemDetails, setItemDetails] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      const decodedToken = jwt_decode(accessToken);

      setUsername(decodedToken.username);
      setIsAdmin(decodedToken.role === "admin");

      if (decodedToken.role === "admin") {
        fetch("http://localhost:5001/api/getItems")
          .then((response) => response.json())
          .then((data) => setItems(data))
          .catch((error) => console.error("Error:", error));
      }
    } else {
      history.push("/login");
    }
  }, [history]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    history.push("/login");
  };

  const handleAddItem = (event) => {
    event.preventDefault();
    const gameName = event.target.elements.gameName.value;
    const itemName = event.target.elements.itemName.value;
    const itemDetails = event.target.elements.itemDetails.value;

    addItem(gameName, itemName, itemDetails, selectedImage, setItems);
  };

  const handleDeleteItem = (itemId) => {
    deleteItem(itemId, setItems);
  };

  const handleAddItemVariant = (event) => {
    event.preventDefault();
    const itemId = event.target.elements.itemId.value;
    const nominal = event.target.elements.nominal.value;
    const price = event.target.elements.price.value;

    addItemVariant(itemId, nominal, price)
      .then((data) => {
        // Lakukan sesuatu jika diperlukan setelah item varians ditambahkan
      })
      .catch((error) => {
        // Tangani error jika diperlukan
      });
  };

  
  return (
    <div style={{ display: 'flex' }}>
      
      <Sidebar />

      <div style={{ flex: 1, padding: '16px' }}>
        <h2>Welcome, {username}!</h2>
        {isAdmin ? (
          <div>
            <h3>Admin Dashboard</h3>
            <form onSubmit={handleAddItem} method="post" encType="multipart/form-data">
              <input type="text" name="gameName" value={gameName} onChange={e => setGameName(e.target.value)} placeholder="Nama Game" required />
              <input type="text" name="itemName" value={itemName} onChange={e => setItemName(e.target.value)} placeholder="Nama Item" required />
              <input type="text" name="itemDetails" value={itemDetails} onChange={e => setItemDetails(e.target.value)} placeholder="Detail Item" required />
              <input type="file" accept="image/*" onChange={e => setSelectedImage(e.target.files[0])} required />
              <br></br>
              <button style={{ textDecoration: 'none', color: 'red' }} type="submit">Tambah Item</button>
            </form>
            <form style={{ textDecoration: 'none', color: 'white' }} onSubmit={handleAddItemVariant}>
              <label >Pilih Item : </label>
              <br></br>
              <select name="itemId" required>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.game_name}: {item.item_name} - {item.item_details}
                </option>
              ))}
            </select>
            <br></br>
              <input type="number" name="nominal" placeholder="Nominal" required />
              <br></br>
              <input type="number" name="price" placeholder="Harga" required />
              <br></br>
              <button type="submit">Tambah Variasi Item</button>
            </form>
            {items.map((item, index) => (
              <><p key={index}>{item.game_name}: {item.item_name} - {item.item_details}</p>
              <button onClick={() => handleDeleteItem(item.id)}>Hapus</button></>
            ))}
          </div>
        ) : (
          <div>
            <h3>User Dashboard</h3>
            <p>Ini adalah konten khusus pengguna.</p>
          </div>
        )}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;

