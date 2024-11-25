import { fixedPrice } from "../../../services/book-utils.service.js";
import { capitalize } from "../../../services/util.service.js";
import { LongTxt } from "./LongTxt.jsx";
import { ReaderLevel } from "./ReaderLevel.jsx";

const { Link } = ReactRouterDOM;
const { useState, useEffect } = React;


export function BookPreview({ book }) {

    function getBookPriceColor(price) {
        if (price > 150) return "red";
        if (price < 20) return "green";
        return "inherit";
    }

    return (
        <article className="book-preview">
            <header className="book-cover">
                <ReaderLevel pageCount={book.pageCount} />
                {book.listPrice.isOnSale && <div className="sale">ON<b>SALE</b>!</div>}
                <img src={book.thumbnail} alt={book.title + "'s cover"} />
            </header>
            <h3>{capitalize(book.title)} ({book.publishedDate})</h3>
            <p className="authors">Written By {book.authors.join(' & ')}</p>
            <p style={{ fontSize: ".9em", color: "#1f1f1e" }}>{capitalize(book.subtitle)}</p>
            <LongTxt style={{ flexGrow: 1, height: "100%" }} length={150} txt={capitalize(book.description)} />
            <p style={{ color: getBookPriceColor(book.listPrice.amount) }}><b>{fixedPrice(book.listPrice.amount)} {book.listPrice.currencyCode}</b></p>
            <footer>
                <button><Link to={`/book/${book.id}`}>Preview</Link></button>
                <button><Link to={`/book/edit/${book.id}`}>Edit</Link></button>
            </footer>
        </article>
    )
}