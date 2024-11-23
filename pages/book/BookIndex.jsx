import { Loading } from "../../cmps/Loading.jsx";
import { getQueryParamsFilters } from "../../services/book-utils.service.js";
import { bookService } from "../../services/book.service.js";
import { BookFilter } from "./cmps/BookFilter.jsx";
import { BookList } from "./cmps/BookList.jsx";

const { useEffect, useState } = React;
const { useSearchParams } = ReactRouterDOM;

export function BookIndex() {
    const [books, setBooks] = useState();
    const [filter, setFilter] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        let filterParams = {};
        if (filter.type && filter.value)
            filterParams = { [filter.type]: filter.value };
        setSearchParams(filterParams);
        getBooks();
    }, [filter.type, filter.value])

    useEffect(() => {
        updateQueryParams();
    }, [])

    function getBooks() {
        bookService.query({ [filter.type]: filter.value })
            .then(setBooks)
            .catch(err => {
                setBooks(null)
                console.log("Cant get books:", err)
            });
    }

    const updateQueryParams = () => {
        // Example:
        // { type: "title", value: "test" }
        setFilter(getQueryParamsFilters(searchParams));
    }

    if (books === undefined) return <Loading />
    if (books === null) return <h2>Error getting books</h2>
    return (
        <section className="book-index">
            <BookFilter onFilterUpdate={setFilter} initialType={filter.type} initialValue={filter.value} />
            <BookList books={books} />
        </section>
    )
}