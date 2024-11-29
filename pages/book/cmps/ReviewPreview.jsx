import { capitalize } from "../../../services/util.service.js";
import { Star } from "./Star.jsx";

export function ReviewPreview({ review, onDelete }) {
    const ratings = Array.from({ length: 5 }, (_, i) => i + 1);
    return (
        <article className="review-preview" >
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1em", marginBottom: ".5em" }}>
                    <h3 style={{ margin: 0 }}>{review.fullname.split(" ").map(capitalize).join(" ")}</h3>
                    <span>
                        {ratings.map(i => <Star style={{ cursor: "normal" }} className={`star ${(i <= review.rating && review.rating > 0) ? "star-active" : ""}`} key={i} />)}
                    </span>
                </div>
                <button onClick={() => onDelete(review.id)}>Delete</button>
            </header>
            <div>
                <span style={{ fontSize: ".9em" }}>Read At: {review.readAt}</span>
            </div>
        </article>
    )
}