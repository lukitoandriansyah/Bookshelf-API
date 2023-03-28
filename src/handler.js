const books = require('./books');
const {nanoid} = require("nanoid");

const addBook = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = request.payload;

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt
    }

    if (newBook.name === undefined || newBook.name.toString().trim().length === 0) {
        const resp = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });

        resp.code(400);
        return resp;
    } else if (parseInt(newBook.readPage.toString()) > parseInt(newBook.pageCount.toString())) {
        const resp = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });

        resp.code(400);
        return resp;
    }

    books.push(newBook);
    const resp = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
            bookId: id,
        }
    })

    resp.code(201);
    return resp;

}
const getBooks = () => ({
    status: 'success',
    data: {
        books
    },
});

module.exports = {getBooks, addBook};