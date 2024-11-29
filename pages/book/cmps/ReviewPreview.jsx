import { capitalize } from "../../../services/util.service.js";
import { Star } from "./Star.jsx";

export function ReviewPreview({ review, onDelete }) {
    const ratings = Array.from({ length: 5 }, (_, i) => i + 1);
    return (
        <article className="review-preview">
            <header className="review-preview-header">
                <h3>{review.fullname.split(" ").map(capitalize).join(" ")}</h3>
                <span style={{ fontSize: ".9em" }}>{review.readAt}</span>
                <button onClick={() => onDelete(review.id)}>Delete</button>
            </header>
            {ratings.map(i => <Star className={`star ${(i <= review.rating && review.rating > 0) ? "star-active" : ""}`} key={i} />)}
        </article>
    )
}