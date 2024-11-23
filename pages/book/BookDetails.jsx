import { Loading } from "../../cmps/Loading.jsx";
import { calcFullPrice, fixedPrice, getBookTags } from "../../services/book-utils.service.js";
import { bookService, } from "../../services/book.service.js";
import { capitalize } from "../../services/util.service.js";
import { BookTag } from "./cmps/BookTag.jsx";

const { useParams, useNavigate } = ReactRouterDOM;
const { useState, useEffect } = React;

export function BookDetails() {
    const [book, setBook] = useState();
    const { bookId } = useParams();
    const navigate = useNavigate();

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

    if (book === undefined) return <Loading />
    if (book === null) return <h2>Book not found</h2>

    let bookTags = getBookTags(book);
    bookTags = bookTags.concat(book.categories || []);

    const handleBackClick = () => {
        navigate("/book")
    }

    return (
        <section className="book-details page-section">
            <button onClick={handleBackClick}>Back</button>
            <article className="book-details-container">
                <div>
                    <img src={book.thumbnail} alt={book.title + "'s cover"} />
                    {book.listPrice.isOnSale && <p className="sale">Book is on SALE!</p>}
                </div>
                <section style={{ paddingTop: "1em" }}>
                    <header style={{ marginBottom: "2em" }}>
                        {bookTags.length && <div className="book-tags-container">
                            {bookTags.map(tag => <BookTag text={tag} key={tag} />)}
                        </div>}
                        <h2>{capitalize(book.title)} ({book.publishedDate})</h2>
                        <p>{book.authors.length && <span>Written By {book.authors.join(' & ')}</span>}</p>
                    </header>
                    <p>{capitalize(book.subtitle)}</p>
                    <p style={{ flexGrow: 1 }}>{capitalize(book.description)}</p>
                    <footer className="book-details-price">
                        <span>Only for </span>
                        {book.listPrice.isOnSale ?
                            <span>
                                <s>{calcFullPrice(book.listPrice.amount)}</s> {fixedPrice(book.listPrice.amount)} {book.listPrice.currencyCode}
                            </span> :
                            <span>{fixedPrice(book.listPrice.amount)} {book.listPrice.currencyCode}</span>}
                    </footer>
                </section>
            </article >
        </section >
    )
}   