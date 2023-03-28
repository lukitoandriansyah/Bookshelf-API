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

const getBooks = (response, h) => {
    const booksIsAny = books.length
    if (booksIsAny > 0) {
        const bookList = [];
        for (let i = 0; i < booksIsAny; i++) {
            const keyBook = {
                id: books[i].id,
                name: books[i].name,
                publisher: books[i].publisher
            }
            bookList.push(keyBook);
        }

        const resp = h.response({
            status: 'success',
            data: {
                books: bookList,
            },
        });
        resp.code(200);
        return resp;
    }

    const resp = h.response({
        status: 'success',
        data: {
            books: [],
        },
    });
    resp.code(200);
    return resp;
}

const getBookById = (request, h) => {
    const {bookId} = request.params;
    const book = books.filter((book) => book.id === bookId)[0];
    if (book) {
        if (parseInt(book.pageCount.toString()) === parseInt(book.readPage.toString())) {
            if (book) {
                const resp = h.response({
                    status: 'success',
                    data: {
                        book
                    },
                });

                resp.code(200);
                return resp;
            }

            const resp = h.response({
                status: 'fail',
                message: 'Buku tidak ditemukan',
            });
            resp.code(404);
            return resp;
        }
        const resp = h.response({
            status: 'success',
            data: {
                book
            },
        });

        resp.code(200);
        return resp;
    }
    const resp = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    resp.code(404);
    return resp;
}

const updateBook = (request, h) => {
    const {bookId} = request.params;
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

    const updatedAt = new Date().toISOString()
    const index = books.findIndex((book) => book.id === bookId)

    if (index !== -1) {

        if (name === undefined || name.toString().trim().length === 0) {
            const resp = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi nama buku',
            })

            resp.code(400);
            return resp;
        } else if (parseInt(readPage.toString()) > parseInt(pageCount.toString())) {
            const resp = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
            })
            resp.code(400);
            return resp;
        }


        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt
        }

        const resp = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        })

        resp.code(200);
        return resp;
    }

    const resp = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    })
    resp.code(404);
    return resp

}

const deleteBook = (request, h)=>{
    const  {bookId}=request.params;
    const index = books.findIndex((book)=>book.id===bookId)
    if(index !==-1){

        if(books[index].finished.toString==='True'){
            books.splice(index,1)

            const resp = h.response({
                status:'success',
                message:'Buku berhasil dihapus',
            });
            resp.code(200);
            return resp;
        }

        books.splice(index,1)

        const resp = h.response({
            status:'success',
            message:'Buku berhasil dihapus',
        });
        resp.code(200);
        return resp;
    }

    const resp = h.response({
        status: 'fail',
        message:'Buku gagal dihapus. Id tidak ditemukan'
    })

    resp.code(404);
    return resp;

}


module.exports = {
    getBooks,
    addBook,
    getBookById,
    updateBook,
    deleteBook
};