import React, {useState} from "react";

function PlantCard({plant, toggleSoldOut}) {
  const [isSoldOut, setAsSoldOut] = useState(plant.isSoldOut || false)

  const handleToggleSoldOut = () => {
    setAsSoldOut((previousState) => !previousState)
    toggleSoldOut(plant.id)
  }
  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      {/* {true ? ( */}
        <button className={isSoldOut ? "" : "primary"} onClick={handleToggleSoldOut}>
          {isSoldOut ? "Out of Stock" : "In Stock"}
        </button>
      {/* ) : (
        <button>Out of Stock</button>
      )} */}
    </li>
  );
}

export default PlantCard;
