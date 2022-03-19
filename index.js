const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://TheQ:z3x2c1v0!@boiler-plate.wiaru.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(()=> console.log("MongoDB Connected..."))
    .catch(err => console.log(err))



app.get('/', (req, res) => res.send('hello world!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))