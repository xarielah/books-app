import { capitalize } from "../../../services/util.service.js";
import { ReaderLevel } from "./ReaderLevel.jsx";

const { Link } = ReactRouterDOM;

export function BookPreview({ book }) {
    return (
        <article className="book-preview">
            <header className="book-cover">
                <ReaderLevel pageCount={book.pageCount} />
                {book.listPrice.isOnSale && <div className="sale">ON<b>SALE</b>!</div>}
                <img src={book.thumbnail} alt={book.title + "'s cover"} />
            </header>
            <h3>{book.title} ({book.publishedDate})</h3>
            <p className="authors">Written By {book.authors.join(' & ')}</p>
            <p>{capitalize(book.subtitle)}</p>
            <p>{capitalize(book.description)}</p>
            <p>{book.listPrice.price}</p>
            <footer>
                <button><Link to={`/book/${book.id}`}>Preview</Link></button>
                <button><Link to={`/book/edit/${book.id}`}>Edit</Link></button>
            </footer>
        </article>
    )
}