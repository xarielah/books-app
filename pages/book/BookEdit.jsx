import { Loading } from "../../cmps/Loading.jsx";
import { bookService } from "../../services/book.service.js";
import { capitalize } from "../../services/util.service.js";

const { useState, useEffect } = React;
const { useParams } = ReactRouterDOM;

export function BookEdit() {
    const [book, setBook] = useState();
    const params = useParams();

    useEffect(() => {
        const bookId = params.bookId;
        bookService.get(bookId)
            .then(setBook)
            .catch(err => {
                setBook(null)
                console.log("Cant get book:", err)
            });
    }, [])

    if (book === undefined) return <Loading />
    return (
        <section className="book-edit page-section">
            {book ? <h3>Editing book: {capitalize(book.title)}</h3> : <h3>Add New Book</h3>}
            <form className="book-edit-form">
                <label>
                    <span>Title</span>
                    <input className="input" type="text" placeholder="Title" value={book.title} onChange={e => setBook({ ...book, title: e.target.value })} />
                </label>
                <label>
                    <span>Subtitle</span>
                    <input className="input" type="text" placeholder="Subtitle" value={book.subtitle} onChange={e => setBook({ ...book, subtitle: e.target.value })} />
                </label>
                <label>
                    <span>Description</span>
                    <textarea className="input" placeholder="Description" value={book.description} onChange={e => setBook({ ...book, description: e.target.value })} />
                </label>
                <button>Save</button>
            </form>
        </section>
    )
}   