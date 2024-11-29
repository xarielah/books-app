
const { useState } = React;

const defaultValues = {
    rating: 0,
    fullname: "",
    readAt: new Date()
}

export function AddReview({ bookId }) {
    const [review, setReview] = useState(defaultValues);

    const handleChange = (e) => {
        const { name, value } = e.target
        setReview({ ...review, [name]: value })
    }

    const handleSubmission = (e) => {
        e.preventDefault();
    }

    const ratings = Array.from({ length: 5 });

    const handleRating = (rating) => {
        setReview({ ...review, rating })
    }

    return (
        <section className="book-review">
            <h3>Add Review</h3>
            <form className="book-review-form" onSubmit={handleSubmission}>
                <label>
                    <span>Full Name</span>
                    <input required className="input" name="fullname" placeholder="Full Name" value={review.fullname} onChange={handleChange} />
                </label>
                <span>Rating</span>
                <div style={{ display: "flex", gap: "1em" }}>
                    {ratings.map((_, i) => <div role="button" style={{}} key={i} onClick={() => handleRating(i + 1)}><img src="/assets/img/star.png" className={`star ${(i < review.rating && review.rating > 0) ? "star-active" : ""}`} /></div>)}
                </div>
                <label>
                    <span>Rate At</span>
                    <input required className="input" name="readAt" placeholder="Read At" value={review.readAt} type="date" onChange={handleChange} />
                </label>
                <button style={{ width: "max-content", margin: "0 auto" }}>Submit Review</button>
            </form>
        </section>
    )
}