if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const {stripe} = require('stripe');

const app = express();

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server started on port " + port))

const publicKey = process.env.PUBLIC_KEY;
const secretKey = process.env.SECRET_KEY;


console.log(secretKey, publicKey);