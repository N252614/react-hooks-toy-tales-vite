import React, { useState } from "react";

/**
 * Controlled form for creating a new toy.
 * Delegates the actual POST to the parent via `onAddToy`.
 */
function ToyForm({ onAddToy }) {
  // Local controlled inputs for name and image URL
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  // Update local state when user types
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Submit handler: prevent reload, validate, call parent
  function handleSubmit(e) {
    e.preventDefault();

    const trimmed = {
      name: formData.name.trim(),
      image: formData.image.trim(),
    };

    // Basic guard: require both fields
    if (!trimmed.name || !trimmed.image) return;

    // Let the parent (App) perform the POST and state update
    onAddToy(trimmed);

    // Reset inputs after successful submit
    setFormData({ name: "", image: "" });
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
          required
        />
        


        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={formData.image}
          onChange={handleChange}
          required
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