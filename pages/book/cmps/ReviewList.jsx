import { ReviewPreview } from "./ReviewPreview.jsx";

export function ReviewList({ reviews, onDelete }) {
    return (
        <section className="book-review-list">
            {reviews.length === 0 && <h3>No reviews found</h3>}
            {reviews.map(review => <ReviewPreview onDelete={onDelete} review={review} key={review.id} />)}
        </section>
    )
}