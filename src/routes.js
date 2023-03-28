const {getBooks} = require("./handler");
const routes=[{
    method:'GET',
    path:'/books',
    handler:getBooks
},];

module.exports=routes;