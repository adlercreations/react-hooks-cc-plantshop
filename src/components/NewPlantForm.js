import React, {useState} from "react";

function NewPlantForm({addPlant}) {
  const [formData,setFormData] = useState({
    name: "",
    image: "",
    price: "",
  })

  const handleChange = (event) => {
    const {name, value} = event.target
    
    setFormData((previousState) => ({
      ...previousState,
      [name]: value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const plantData = {
      ...formData, price: formData.price.toString(),
    }
    
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(plantData)
    })
      .then((response) => response.json())
      .then((data) => {
        addPlant(data)
        setFormData({
          name: "",
          image: "",
          price: "",
        })
      })
      .catch((error) => {
        console.error("Error adding plant:", error)
      })
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" value={formData.name} onChange={handleChange} />
        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} />
        <input type="number" name="price" step="0.01" placeholder="Price" value={formData.price} onChange={handleChange} />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
