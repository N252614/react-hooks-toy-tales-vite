import React, { useEffect, useState } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

// API base: in dev (npm run dev) use localhost:3001, otherwise use relative path
const API = import.meta.env.DEV ? "http://localhost:3001" : "";

function App() {
  // Keep UI state: show/hide form and the list of toys
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // Load toys once on initial mount
  useEffect(() => {
    fetch(`${API}/toys`)
      .then((r) => r.json())
      .then(setToys)
      .catch(console.error);
  }, []);

  // Add a new toy (actual POST is done here, not in the form)
  function handleAddToy(newToy) {
    const payload = { ...newToy, likes: 0 };

    fetch(`${API}/toys`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((r) => r.json())
      .then((created) => {
        setToys((prev) => [...prev, created]);
      })
      .catch(console.error);
  }

  // Increment likes for one toy
  function handleLike(id) {
    const target = toys.find((t) => t.id === id);
    if (!target) return;

    const nextLikes = target.likes + 1;

    fetch(`${API}/toys/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: nextLikes }),
    })
      .then((r) => r.json())
      .then(() => {
        setToys((prev) =>
          prev.map((t) => (t.id === id ? { ...t, likes: nextLikes } : t))
        );
      })
      .catch(console.error);
  }

  // Delete a toy by id
  function handleDelete(id) {
    fetch(`${API}/toys/${id}`, { method: "DELETE" })
      .then(() => {
        setToys((prev) => prev.filter((t) => t.id !== id));
      })
      .catch(console.error);
  }

  return (
    <>
      <Header />
      <div className="buttonContainer">
        <button onClick={() => setShowForm((s) => !s)}>Add a Toy</button>
      </div>

      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}

      <ToyContainer toys={toys} onLike={handleLike} onDelete={handleDelete} />
    </>
  );
}

export default App;