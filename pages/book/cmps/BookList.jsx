import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books }) {
    return (
        <section className="book-list">
            {books.length === 0 && <h3>No books found</h3>}
            {books.map(book => <BookPreview book={book} key={book.id} />)}
        </section>
    )
}