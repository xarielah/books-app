import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
}

// For Debug (easy access from console):
// window.cs = bookservice

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                return books.filter(book => regExp.test(book.title))
            }

            if (filterBy.subtitle) {
                const regExp = new RegExp(filterBy.subtitle, 'i')
                return books.filter(book => regExp.test(book.subtitle))
            }

            if (filterBy.description) {
                const regExp = new RegExp(filterBy.description, 'i')
                return books.filter(book => regExp.test(book.description))
            }

            if (filterBy.categories) {
                const regExp = new RegExp(filterBy.categories, 'i')
                return books.filter(book => book.categories.some(category => regExp.test(category)))
            }

            if (filterBy.authors) {
                const regExp = new RegExp(filterBy.authors, 'i')
                return books.filter(book => book.authors.some(author => regExp.test(author)))
            }

            return books;
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        const newlyCreatedBook = _createBook(book);
        return storageService.post(BOOK_KEY, newlyCreatedBook)
    }
}


function getDefaultFilter(filterBy = { txt: '', minSpeed: 0 }) {
    return { txt: filterBy.txt, minSpeed: filterBy.minSpeed }
}

export function getSiblingBooks(bookId) {
    return storageService.query(BOOK_KEY).then(books => {
        const bookIdx = books.findIndex(book => book.id === bookId)
        if (bookIdx < 0) return []
        const rightSiblingIdx = bookIdx + 1 > books.length - 1 ? books.length - 1 : bookIdx + 1
        const leftSiblingIdx = bookIdx - 1 < 0 ? 0 : bookIdx - 1
        return {
            prevBook: books[leftSiblingIdx].id,
            nextBook: books[rightSiblingIdx].id
        }
    })
}

function _createBook(book = {}) {
    return ({
        id: utilService.makeId(),
        title: utilService.makeLorem(2),
        subtitle: utilService.makeLorem(4),
        authors: [
            utilService.generateRandomName()
        ],
        publishedDate: utilService.getRandomIntInclusive(1950, 2024),
        description: utilService.makeLorem(20),
        pageCount: utilService.getRandomIntInclusive(20, 600),
        language: "en",
        listPrice: {
            amount: utilService.getRandomIntInclusive(80, 500),
            currencyCode: "EUR",
            isOnSale: Math.random() > 0.7
        },
        ...book
    })
}

function _createBooks() {
    if (!localStorage.getItem(BOOK_KEY)) {
        const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
        const books = []
        for (let i = 0; i < 20; i++) {
            const book = _createBook();
            books.push({
                ...book,
                categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
                thumbnail: `https://coding-academy.org/books-photos/${i + 1}.jpg`,
            })
        }
        console.log(books)
        storageService.replaceMany(BOOK_KEY, books)
    }
}