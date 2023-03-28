const {getBooks, addBook, getBookById, getBookByIdFinished, updateBook} = require("./handler");
const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBook
    },
    {
        method: 'GET',
        path: '/books',
        handler: getBooks
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookById
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateBook
    },

];

module.exports = routes;