import { bookservice } from "../../services/book.service.js";

const { useParams } = ReactRouterDOM;
const { useState, useEffect } = React;

export function BookDetails() {
    const [book, setBook] = useState();
    const { bookId } = useParams();

    useEffect(() => {
        getBook();
    }, [])

    function getBook() {
        bookservice.get(bookId)
            .then(setBook)
            .catch(err => {
                setBook(null)
                console.log("Cant get book:", err)
            });
    }

    if (book === undefined) return <h2>Loading...</h2>
    if (book === null) return <h2>Book not found</h2>
    return (
        <section className="book-details">
            <h2>Book Details</h2>
        </section>
    )
}   