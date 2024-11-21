const { Link } = ReactRouterDOM;

export function BookPreview({ book }) {
    console.log("🚀 ~ BookPreview ~ book:", book)
    return (
        <div className="book-preview">
            <div className="book-cover">
                {book.listPrice.isOnSale && <div className="sale">ON<b>SALE</b>!</div>}
                <img src={book.thumbnail} alt={book.title + "'s cover"} />
            </div>
            <h3>{book.title} ({book.publishedDate})</h3>
            <p>{book.authors.join(', ')}</p>
            <p>{book.subtitle}</p>
            <p>Description: {book.description}</p>
            <div>
                <button><Link to={`/book/${book.id}`}>Preview</Link></button>
                <button><Link to={`/book/edit/${book.id}`}>Edit</Link></button>
            </div>
        </div>
    )
}