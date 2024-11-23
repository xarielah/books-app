export function getBookTags(book,) {
    if (!book) return [];

    const eligibleTags = [
        _getBookTypeTag,
        _getBookAgeTag
    ];

    return _getBookTags(book, eligibleTags);
}

export function _getBookTags(book, fnArr) {
    if (!book) return [];
    const tags = [];

    for (let fn of fnArr) {
        const tag = fn(book);
        if (tag) tags.push(tag);
    }

    return tags;
}

function _getBookAgeTag(book) {
    if (!book) return null;
    const thisYear = new Date().getFullYear();
    if (thisYear - book.publishedDate > 10) return "Vintage";
    if (thisYear - book.publishedDate < 1) return "New";
    return null;
}

function _getBookTypeTag(book) {
    if (!book) return null;
    if (book.pageCount > 500) return "Serious Readers";
    if (book.pageCount > 200) return "Decent Readers";
    if (book.pageCount > 100) return "Light Readers";
    return null;
}

export function calcFullPrice(oldPrice) {
    return (oldPrice * 1.25).toFixed(2);
}

export function fixedPrice(price) {
    return price.toFixed(2);
}

export const filterTypes = Object.freeze({
    TITLE: 'title',
    AUTHORS: 'authors',
    SUBTITLE: 'subtitle',
    DESCRIPTION: 'description',
    CATEGORIES: 'categories',
})

export function getQueryParamsFilters(searchParams) {
    const filters = {};
    const keys = Object.values(filterTypes);
    // get the first key that has a value
    for (let key of keys) {
        const value = searchParams.get(key);
        if (value) {
            filters.type = key;
            filters.value = value;
            break;
        }
    }
    return filters;
}