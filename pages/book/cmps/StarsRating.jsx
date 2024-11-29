import { Star } from "./Star.jsx";

const { useState } = React;

export function StarsRating({ rating, onRating }) {
    const [hoverRating, setHoverRating] = useState(rating)
    const ratings = Array.from({ length: 5 }, (_, i) => i + 1);

    return (
        <div style={{ display: "flex", gap: "1em" }} >
            {ratings.map((i) => (<Star
                key={i}
                onMouseEnter={() => setHoverRating(i)}
                onClick={() => onRating(i)}
                onMouseLeave={() => setHoverRating(rating)}
                className={`star ${(i <= hoverRating && hoverRating > 0) ? "star-active" : ""}`}
            />
            ))}
        </div>
    )
}