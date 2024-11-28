import { Loading } from "../../cmps/Loading.jsx";
import { bookService } from "../../services/book.service.js";

const { useState, useEffect } = React;
const { useParams, useNavigate } = ReactRouterDOM;

const defaultValues = {
    title: "",
    description: "",
    subtitle: "",
    id: null
}

export function BookEdit() {
    const [book, setBook] = useState();
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const bookId = params.bookId;
        bookService.get(bookId)
            .then(setBook)
            .catch(err => {
                setBook(defaultValues)
                console.log("Cant get book:", err)
            });
    }, [])

    const handleSubmission = (e) => {
        e.preventDefault();

        bookService.save(book)
            .then((bookCreated) => navigate(`/book/${bookCreated.id}`))
    }

    if (book === undefined) return <Loading />
    return (
        <section className="book-edit page-section">
            {book ? <h3>Edit Book</h3> : <h3>Add Book</h3>}
            <form className="book-edit-form" onSubmit={handleSubmission}>
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
                    <textarea rows="10" className="textarea-input" placeholder="Description" value={book.description} onChange={e => setBook({ ...book, description: e.target.value })} />
                </label>
                <button style={{ width: "max-content", margin: "0 auto" }}>Save</button>
            </form>
        </section>
    )
}   