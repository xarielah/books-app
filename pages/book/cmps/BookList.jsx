import { BookPreview } from "./BookPreview.jsx";

const { useNavigate } = ReactRouterDOM;

export function BookList({ books }) {
    const navigate = useNavigate();

    const navToAddNewBook = () => navigate("/book/edit");

    return (
        <React.Fragment>
            <button onClick={navToAddNewBook}>Add New Book</button>
            <section className="book-list">
                {books.length === 0 && <h3>No books found</h3>}
                {books.map(book => <BookPreview book={book} key={book.id} />)}
            </section>
        </React.Fragment>
    )
}