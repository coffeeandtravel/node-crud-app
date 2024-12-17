const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/model.product.js');
const app = express();
const productRoute = require('./routes/product.routes.js')
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/products", productRoute);


app.get('/', (req, res) => {
    res.send(`<h1>Hello from node API</h1>`);
})

//GET


//POST



//Update a product



//Deleting a product


mongoose.connect('mongodb+srv://test:test@backenddb.d5zjl.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB')
    .then(() => {
        console.log("Connected to MongoDB")
        app.listen(3000, () => {
            console.log("server is running on 3000");
        })
    }).catch(() => console.log("Connection failed"))



