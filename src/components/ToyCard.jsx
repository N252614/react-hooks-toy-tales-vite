import React from "react";

/**
 * Presentational card for a single toy.
 * Receives pre-bound handlers from the parent:
 * - onLike(): increments likes for this toy
 * - onDelete(): deletes this toy
 * The parent already binds the toy id, so we just call the functions.
 */
function ToyCard({ toy, onLike, onDelete }) {
  return (
    <div className="card" data-testid="toy-card">
      {/* Toy name */}
      <h2>{toy.name}</h2>

      {/* Toy image */}
      <img src={toy.image} alt={toy.name} className="toy-avatar" />

      {/* NOTE: tests expect a trailing space after 'Likes' */}
      <p>{toy.likes} Likes </p>

      {/* Call the pre-bound like handler */}
      <button className="like-btn" onClick={onLike}>
        Like &lt;3
      </button>

      {/* Exact text required by tests ('GoodWill' with capital W) */}
      <button className="del-btn" onClick={onDelete}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;