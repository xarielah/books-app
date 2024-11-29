import { Loading } from "../../../cmps/Loading.jsx";
import { reviewService } from "../../../services/review.service.js";
import { AddReview } from "./AddReview.jsx";
import { ReviewList } from "./ReviewList.jsx";

const { useState, useEffect } = React;

export function ReviewIndex({ bookId }) {
    const [reviews, setReviews] = useState();

    useEffect(() => {
        setReviews(undefined)
        reviewService.query(bookId)
            .then(setReviews)
            .catch(err => {
                setReviews(null)
                console.log("Cant get reviews:", err)
            });
    }, [bookId])

    const handleDeleteReview = (reviewId) => {
        reviewService.remove(reviewId)
            .then(() => setReviews(reviews.filter(review => review.id !== reviewId)))
            .catch(err => {
                console.log("Cant delete review:", err)
            });
    }

    const handleAddReview = (review) => {
        setReviews([...reviews, review])
    }

    if (reviews === undefined) return <Loading />
    return (
        <section className="book-review-index">
            <h3>Add Review</h3>
            <AddReview onAdd={handleAddReview} bookId={bookId} />
            <h3>Reviews</h3>
            <ReviewList onDelete={handleDeleteReview} reviews={reviews} />
        </section>
    )
}