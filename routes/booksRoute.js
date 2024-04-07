const express = require('express');
const { Book } = require('../models/bookModel');
const booksRouter = express.Router();


// save a new book
booksRouter.post('/add', async (req, res) => {
    console.log(req.body);
    try {
        const {title, author, publishYear} = req.body;
        if (
            !title ||
            !author ||
            !publishYear
        ){
            return res.status(404).send({
                message: 'Send all required fields'
            })
        }
        const newBook = { title: title, author: author, publishYear: publishYear}
        const books = await Book.create(newBook)
        return res.status(200).send(books)

    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: error.message + "error creating book"
        })
    }
})

// get all books

booksRouter.get('/', async function(req, res) {
 try {
    const allBooks = await Book.find({})
    return res.status(200).json({
        count: allBooks.length,
        data: allBooks
    });
 } catch (error) {
    console.log(error.message);
    res.status(500).send({
        message: error.message
    })
 }
})

// find a book by id
booksRouter.get('/:id', async function(req, res) {
    try {
       const id = req.params.id; 
       const book = await Book.findById(id);
       return res.status(200).json(book);
    } catch (error) {
       console.log(error.message);
       res.status(500).send({
           message: error.message
       })
    }
})

// find and update

booksRouter.put('/:id', async function(req, res) {
    try {
        const {title, author, publishYear} = req.body;
        if (
            !title ||
            !author ||
            !publishYear
            ){
                return res.status(500).send({
                    message: 'Send all required fields'
                })
            }
        const id = req.params.id; 
        const changed = await Book.findByIdAndUpdate(id, req.body);
        if (!changed) {
            return res.status(404).send({ message: 'book not found' });
        }
        return res.status(200).send({ message: 'Book updated successfully' });
        
    } 
        
    catch (error) {
       console.log(error.message);
       res.status(500).send({
           message: error.message
       })
    }
})

// delete a book
booksRouter.delete('/:id', async function(req, res) {
    try {
       const id = req.params.id; 
       const result = await Book.findByIdAndDelete(id);
       if (!result)
       return res.status(404).json({message: 'Book not found'});
       return res.status(200).json(result);
    } catch (error) {
       console.log(error.message);
       res.status(500).send({
           message: error.message
       })
    }
})

module.exports = booksRouter;