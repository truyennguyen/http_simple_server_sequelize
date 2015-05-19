'use strict';

var express = require('express');
var app = express();

var booksRoutes = express.Router();

require('./routes/books_routes')(booksRoutes);

app.use('/api', booksRoutes);

app.listen(process.env.PORT || 3000, function(){
	console.log('server running on port' + (process.env.PORT || 3000));
});