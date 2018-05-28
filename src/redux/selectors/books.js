import lodash from 'lodash';

export const getAllBooks = state => {
    return state.books.all_books;
};

export const getBookById = (state, bookId) => {
    const books = getAllBooks(state);
    const book = lodash.find(books, (book) => {
        return book.id === parseInt(bookId, 10);
    });
    return book;
};

export const getFavouriteBooks = state => {
    const {all_books} = state.books;
    return lodash.filter(all_books, (book) => {
        return !!book.isFavourite;
    });
};