'use strict';

var Book = require('../models/Book');
var bodyparser = require('body-parser');
var Sql = require("sequelize");
var sql = new Sql("books_dev", "books_dev", "foobar123", {dialect: "postgres"});

module.exports = function(router){
	router.use(bodyparser.json());

	//Get all books
	router.get('/books', function(req, res){
		sql.sync().then(function(){
			Book.all().then(function(data){
				res.json(data);
			})
			.error(function(err){
				console.log(err);
				res.status(500).json({msg: "internal server error"});
			});
		});
	});

	//get books by id
	router.get("/books/:id", function(req, res) {
		sql.sync().then(function(){
			Book.find(req.params.id).then(function(data){
				res.json(data);
			})
			.error(function(err){
				console.log(err);
				res.status(500).json({msg: "internal server error"});
			});
		});
	});

	router.post('/books', function(req, res){
		sql.sync().then(function(){
			Book.create(req.body).then(function(data){
				res.json(data);
			})
			.error(function(err){
				console.log(err);
				res.status(500).json({msg: "internal server error"});
			});
		});
	});

	//update the book by id
	router.patch('/books/:id', function(req, res){
		sql.sync().then(function(){
			Book.find(req.params.id).then(function(data){
				data.updateAtrributes(req.body).then(function(){
					res.json(data);
				})
				.error(function(err){
					console.log(err);
					res.status(500).json({msg: "internal server error"});
				});
			});

		});
	});

	router.delete('/books/:id', function(req, res){
		sql.sync().then(function(){
			Book.find(req.params.id).then(function(data){
				data.destroy().then(function(){
					res.json({msg "success"});
				})
				.error(function(err){
					console.log(err);
					res.status(500).json({msg:"internal server error"});
				});
			});
		});
	});
};