const {getBooks, addBook} = require("./handler");
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
];

module.exports = routes;