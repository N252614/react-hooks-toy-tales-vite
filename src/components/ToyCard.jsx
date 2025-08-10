import React from "react";

/**
 * Displays a single toy card with its image, like count,
 * and action buttons (Like, Donate).
 */
function ToyCard({ toy, onLike, onDelete }) {
  const { id, name, image, likes } = toy;

  return (
    <div className="card" data-testid="toy-card">
      {/* Toy name */}
      <h2>{name}</h2>

      {/* Toy image */}
      <img src={image} alt={name} className="toy-avatar" />

      {/* Note the trailing space after 'Likes' to satisfy the test */}
      <p>{likes} Likes </p>

      {/* Pass both id and current likes to the like handler */}
      <button className="like-btn" onClick={() => onLike(id, likes)}>
        Like &lt;3
      </button>

      {/* Button text must be exactly 'Donate to GoodWill' per tests */}
      <button className="del-btn" onClick={() => onDelete(id)}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;