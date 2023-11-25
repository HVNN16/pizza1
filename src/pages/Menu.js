import React, { useState, useEffect } from "react";
import MenuItem from "../components/MenuItem";
import "../styles/Menu.css";

function Menu() {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch menu data from the local db.json file
    fetch("/db.json")  // Update the path to match your project structure
      .then((response) => response.json())
      .then((data) => {
        setMenuData(data.menuItems);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching menu:", error);
        setLoading(false);
      });
  }, []); // Empty dependency array ensures this effect runs once on mount

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="menu">
      <h1 className="menuTitle">Our Menu</h1>
      <div className="menuList">
        {menuData.map((menuItem, index) => (
          <MenuItem
            key={index}
            image={menuItem.image}
            name={menuItem.name}
            price={menuItem.price}
          />
        ))}
      </div>
    </div>
  );
}

export default Menu;
