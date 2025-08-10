import React from "react";
import ToyCard from "./ToyCard";

/**
 * Renders the collection of ToyCard components.
 * Receives the toy list and action handlers from App.
 */
function ToyContainer({ toys, onDeleteToy, onLikeToy }) {
  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard
          key={toy.id}
          toy={toy}
          onDelete={onDeleteToy}
          onLike={onLikeToy}
        />
      ))}
    </div>
  );
}

export default ToyContainer;