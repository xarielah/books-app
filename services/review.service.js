import { storageService } from './async-storage.service.js';

const REVIEW_KEY = "reviewDB"

export const reviewService = {
    addReview,
    query,
    remove
}

function addReview(bookId, review) {
    review.bookId = bookId;
    return storageService.post(REVIEW_KEY, review);
}

function query(bookId) {
    return storageService.query(REVIEW_KEY).then(reviews => {
        return reviews.filter(review => review.bookId === bookId)
    })
}

function remove(reviewId) {
    return storageService.remove(REVIEW_KEY, reviewId)
}