import React, { useEffect, useState } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

// Base URL for our local JSON Server
const API_URL = "http://localhost:3001/toys";

function App() {
  // Controls visibility of the "Add a Toy" form
  const [showForm, setShowForm] = useState(false);

  // Holds the list of toys fetched from the backend
  const [toys, setToys] = useState([]);

  // Fetch all toys once when the component mounts
  useEffect(() => {
    fetch(API_URL)
      .then((r) => r.json())
      .then(setToys)
      .catch((e) => console.error("GET /toys failed:", e));
  }, []);

  // Toggle the "Add a Toy" form
  function handleClick() {
    setShowForm((prev) => !prev);
  }

  // Create a new toy (POST) and append it to the end of the list
  function handleAddToy(values) {
    const payload = { ...values, likes: 0 }; // new toys start with 0 likes
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((r) => r.json())
      .then((created) => {
        // Keep existing order; append newly created toy to the end
        setToys((prev) => [...prev, created]);
      })
      .catch((e) => console.error("POST /toys failed:", e));
  }

  // Delete a toy by id (DELETE) and update local state
  function handleDeleteToy(id) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => {
        // Remove the deleted toy from local state
        setToys((prev) => prev.filter((t) => t.id !== id));
      })
      .catch((e) => console.error("DELETE /toys/:id failed:", e));
  }

  // Like a toy: PATCH likes +1, preserve ordering
  function handleLikeToy(id, currentLikes) {
    // Optimistic UI update for instant feedback
    setToys((prev) =>
      prev.map((t) => (t.id === id ? { ...t, likes: currentLikes + 1 } : t))
    );

    // Persist on the backend
    fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: currentLikes + 1 }),
    })
      .then((r) => r.json())
      .then((updated) => {
        // Ensure UI matches server response; keep order unchanged
        setToys((prev) =>
          prev.map((t) => (t.id === id ? { ...t, likes: updated.likes } : t))
        );
      })
      .catch((e) => {
        console.error("PATCH /toys/:id failed:", e);
        // Optional rollback if PATCH fails
        setToys((prev) =>
          prev.map((t) => (t.id === id ? { ...t, likes: currentLikes } : t))
        );
      });
  }

  return (
    <>
      <Header />

      {/* Conditionally render the form; pass the POST handler down */}
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}

      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>

      {/* Pass toys and handlers for like/delete to the list component */}
      <ToyContainer
        toys={toys}
        onDeleteToy={handleDeleteToy}
        onLikeToy={handleLikeToy}
      />
    </>
  );
}

export default App;