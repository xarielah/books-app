import { bookService } from "../../services/book.service.js";
import { BookList } from "./cmps/BookList.jsx";

const { useEffect, useState } = React;

export function BookIndex() {
    const [books, setBooks] = useState();
    const [filter, setFilter] = useState({});

    useEffect(() => {
        getBooks();
    }, [filter])

    function getBooks() {
        bookService.query(filter)
            .then(setBooks)
            .catch(err => {
                setBooks(null)
                console.log("Cant get books:", err)
            });
    }

    if (books === undefined) return <h2>Loading...</h2>
    if (books === null) return <h2>Error getting books</h2>
    return (
        <section className="book-index">
            <h2>Book Index</h2>
            <BookList books={books} />
        </section>
    )
}