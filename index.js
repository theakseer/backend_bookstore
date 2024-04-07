const express = require('express');
// const { PORT, mongoDBUrl } = require('./config.js');
const mongoose = require('mongoose');
const booksRouter = require('./routes/booksRoute');
const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config()
const PORT = process.env.PORT || 3000; 
const app = express();
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies


app.use(cors()); // for every x origin
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['content-type']
// }));

// for every x
app.get('/', (req, res) => {
    console.log(req);
    return res.status(404).send("Welcoe to MERN Stack projectk")
})

app.use('/books', booksRouter)

mongoose.connect(process.env.MONGO_DB_URL)
    .then(() => {
        console.log(`connected to mongoose successfully`);
        app.listen(PORT, () => {
            console.log(`listening on port ${PORT}`);
        });
    })
    .catch(err => {
        console.log(err);
    });