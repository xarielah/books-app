import { bookService, } from "../../services/book.service.js";

const { useParams } = ReactRouterDOM;
const { useState, useEffect } = React;

export function BookDetails() {
    const [book, setBook] = useState();
    console.log("🚀 ~ BookDetails ~ book:", book)
    const { bookId } = useParams();

    useEffect(() => {
        getBook();
    }, [])

    function getBook() {
        bookService.get(bookId)
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
            {book.listPrice.isOnSale && <div className="sale">Book is on SALE!</div>}
            <h2>{book.title}'s Details</h2>
        </section>
    )
}   