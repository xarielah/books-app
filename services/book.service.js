import { storageService } from './async-storage.service.js'
import { predefindBooks } from './predefined-books.js'
import { utilService } from './util.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
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
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(vendor = '', maxSpeed = '') {
    return { vendor, maxSpeed }
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

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        utilService.saveToStorage(BOOK_KEY, predefindBooks)
    }
}

function _createBook(vendor, maxSpeed = 250) {
    const book = getEmptyBook(vendor, maxSpeed)
    book.id = utilService.makeId()
    return book
}
