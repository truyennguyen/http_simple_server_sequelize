'use strict';

var Sql = require("sequelize");
var sql = new Sql("books_dev", "books_dev", "foobar123", {dialect: "postgres"});

var Book = module.exports = sql.define("Book", {
	name: Sql.STRING,
	author: Sql.STRING,
	price:Sql.STRING
});

Book.sync();