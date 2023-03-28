const {getBooks, addBook, getBookById, getBookByIdFinished} = require("./handler");
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

];

module.exports = routes;