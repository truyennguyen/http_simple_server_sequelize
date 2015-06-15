'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var Book = require('../models/Book');
var Sql = require("sequelize");
var sql = new Sql('notes_dev', 'notes_dev', 'foobar123', {dialect: 'postgres'});

require('../server');

describe('Books REST api tests with PostgreSQL', function() {
  it("should get all books", function(done){
    chai.request("localhost:3000")
    .get("/api/books")
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(typeof res.body).to.eql("object");
      done();
    });
  });

  it("should add a new book", function(done){
    chai.request("localhost:3000")
    .post("/api/books")
    .send({name: "Learn JavaScript", author: "Nathan R", price: "100", id: 1})
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(res.body.name).to.eql("Learn JavaScript");
      expect(res.body.author).to.eql("Nathan R");
      expect(res.body.price).to.eql("100");
      done();
    });
  });

  it("should update an existing book", function(done){
    chai.request("localhost:3000")
    .patch("/api/books/1")
    .send({name: "Learn Full Stack"})
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(res.body.name).to.eql("Learn Full Stack");
      expect(res.body.author).to.eql("Nathan R");
      done();
    });
  });

  it("should delete a book", function(done){
    chai.request("localhost:3000")
    .delete("/api/books/1")
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql("success");
      done();
  });
});