import { Loading } from "../../../cmps/Loading.jsx";
import { reviewService } from "../../../services/review.service.js";
import { utilService } from "../../../services/util.service.js";
import { StarsRating } from "./StarsRating.jsx";

const { useState, useRef, useEffect } = React;

const defaultValues = {
    rating: 0,
    fullname: "",
    readAt: new Date()
}

export function AddReview({ bookId, onAdd }) {
    const [review, setReview] = useState(defaultValues);
    const [submitting, setSubmitting] = useState(false);
    const ratingRef = useRef();

    useEffect(() => {
        if (review.rating >= 0) ratingRef.current.children[0].style.color = "inherit";
    }, [review.rating])

    const handleChange = (e) => {
        const { name, value } = e.target
        setReview({ ...review, [name]: value })
    }

    const handleSubmission = (e) => {
        e.preventDefault();
        if (review.rating === 0) {
            utilService.animateCSS(ratingRef.current);
            ratingRef.current.children[0].style.color = "red";
            return;
        }
        setSubmitting(true)
        reviewService.addReview(bookId, review)
            .then((review) => {
                onAdd(review)
                setReview(defaultValues)
            })
            .finally(() => setSubmitting(false))
    }

    const handleRating = (rating) => {
        setReview({ ...review, rating: rating })
    }

    if (submitting) return <Loading />
    return (
        <section className="book-review">
            <form className="book-review-form" onSubmit={handleSubmission}>
                <label>
                    <span>Full Name</span>
                    <input style={{ fontSize: "1em" }} required className="input" name="fullname" placeholder="Full Name" value={review.fullname} onChange={handleChange} />
                </label>
                <label ref={ratingRef}>
                    <span style={{ marginBottom: ".5em" }}>Rating</span>
                    <StarsRating onRating={handleRating} rating={review.rating} />
                </label>
                <label>
                    <span>Read At</span>
                    <input required className="input" name="readAt" placeholder="Read At" value={review.readAt} type="date" onChange={handleChange} />
                </label>
                <button style={{ width: "max-content", margin: "0 auto" }}>Submit Review</button>
            </form>
        </section>
    )
}