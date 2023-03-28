const books = require('./books');
const getBooks=()=>({
    status: 'success',
        data:{
        books
        },
});

module.exports={getBooks};