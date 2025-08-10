import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, onLike, onDelete }) {
  // Render the collection of cards (each must have a stable key)
  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard
          key={toy.id}
          toy={toy}
          // Pass bound handlers so the card doesn’t need to know the id shape
          onLike={() => onLike(toy.id)}
          onDelete={() => onDelete(toy.id)}
        />
      ))}
    </div>
  );
}

export default ToyContainer;