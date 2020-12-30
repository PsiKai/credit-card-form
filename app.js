if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const publicKey = process.env.PUBLIC_KEY;
const secretKey = process.env.SECRET_KEY;


const express = require('express');

const stripe = require('stripe')(secretKey);
const bodyParser = require("body-parser");
const cors = require('cors');
const {v4: uuid} = require('uuid');

const app = express();

//middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(cors())

//listen
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server started on port " + port))



//routes
// app.get("/", (req, res) => {
//     res.send("Hello World")
// })


app.post("/charge", (req, res) => {
    const {product, token} = req.body;
    console.log("Product", product);
    console.log("Price", product.price);
    const idempotencyKey = uuid()

    return stripe.customers.create({
        email: token.email,
        source: token.id
    })
    .then(customer => {
        stripe.charges.create({
            amount: product.price * 100,
            currencty: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: `You purchease product.name`,
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address_country
                }
            }
        }, {idempotencyKey})
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))
})