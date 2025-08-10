import React, { useState } from "react";

/**
 * Controlled form for creating a new toy.
 * The parent (App) performs the actual POST via `onAddToy`.
 */
function ToyForm({ onAddToy }) {
  // Local controlled inputs for name and image URL
  const [formData, setFormData] = useState({ name: "", image: "" });

  // Update local state when the user types
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Submit handler: prevent reload, validate, and delegate to parent
  function handleSubmit(e) {
    e.preventDefault();
    // Basic guard: avoid empty submissions
    if (!formData.name.trim() || !formData.image.trim()) return;

    onAddToy(formData); // parent will POST and set likes: 0
    setFormData({ name: "", image: "" }); // reset the form
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>

        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={formData.name}
          onChange={handleChange}
        />
        


        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={formData.image}
          onChange={handleChange}
        />
        


        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;