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
    const {product, token, info} = req.body;
    console.log("Product", product.name);
    console.log("Price", product.price);
    console.log(info);
    const idempotencyKey = uuid()

    return stripe.customers.create({
        name: `${info.fName} ${info.lName}`,
        email: info.email,
        source: token.id
    })
    .then(customer => {
        stripe.charges.create({
            amount: product.price * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: info.email,
            description: `${info.fName} purchased ${product.name}`,
            shipping: {
                name: `${info.fName} ${info.lName}`,
                address: {
                    country: token.card.address_country,
                    line1: info.address,
                    city: info.city,
                    state: info.state,
                    postal_code: info.zip
                }
            }
        }, {idempotencyKey})
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.error(err))
})