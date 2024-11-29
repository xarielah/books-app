import { Star } from "./Star.jsx";

const { useState } = React;

export function StarsRating({ rating, onRating }) {
    const [hoverRating, setHoverRating] = useState(rating)
    const ratings = Array.from({ length: 5 }, (_, i) => i + 1);

    return (
        <div style={{ display: "flex" }} >
            {ratings.map((i) => (
                <span
                    key={i}
                    style={{ padding: '0 .5em', cursor: "pointer" }}
                    onClick={() => onRating(i)}
                    onMouseEnter={() => setHoverRating(i)}
                    onMouseLeave={() => setHoverRating(rating)}
                >
                    <Star
                        className={`star ${(i <= hoverRating && hoverRating > 0) ? "star-active" : ""}`}
                    />
                </span>
            ))}
        </div>
    )
}