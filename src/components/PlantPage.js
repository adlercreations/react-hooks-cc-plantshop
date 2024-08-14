import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([])
  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    fetch("http://localhost:6001/plants")
    .then((response) => response.json())
    .then((data) => {
      setPlants(data)
    })
    .catch((error) => {
      console.error("Error fetching plants:", error)
    })
  }, [])

  const addPlant = (newPlant) => {
    setPlants((previousPlants) => [...previousPlants, newPlant])
  }

  const toggleSoldOut = (id) => {
    setPlants((previousPlants) => 
      previousPlants.map((plant) => 
        plant.id === id ? {...plant, isSoldOut: !plant.isSoldOut} : plant
      )
    )
  }

  const handleSearchChange = (searchInput) => {
    setSearchInput(searchInput)
  }

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchInput.toLowerCase())
  )

  return (
    <main>
      <NewPlantForm addPlant={addPlant}/>
      <Search searchChange={handleSearchChange}/>
      <PlantList plants={filteredPlants} toggleSoldOut={toggleSoldOut}/>
    </main>
  );
}

export default PlantPage;
