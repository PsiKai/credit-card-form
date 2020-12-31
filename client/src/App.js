import React, {Fragment, useState} from 'react'
import './App.css';

// @stripe
import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const [creditCardInput, setCreditCardInput] = useState({
    email: "",
    fName: "",
    lName: "",
    address: "",
    city: "",
    state: "",
    zip: ""
  });

  const onFormChange = (e) => {
    setCreditCardInput({
      ...creditCardInput,
      [e.target.name]: e.target.value
    })
  }

  const product = {
    name: "Product",
    price: 12.99
  };

  const stripe = useStripe();
  const elements = useElements();

  async function stripeTokenHandler(token) {
    console.log(token, product.price);
    const body = {
      product,
      info: creditCardInput,
      token
    }
    const response = await fetch('/charge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
  }

  const handleChange = (e) => {
    if (e.error) {
      alert(e.error.message)
    }
  }

  const handleSubmit =  async (e) => {
    e.preventDefault();
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.errr) {
      alert(result.error.message);
    } else {
      stripeTokenHandler(result.token)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
      <label htmlFor="email">Email</label>
        <input 
          id="email"
          name="email" 
          type="email" 
          placeholder="Email" 
          onChange={onFormChange} 
          value={creditCardInput.email}>
        </input>
        <label htmlFor="fName">First Name</label>
        <input 
          id="fName"
          name="fName" 
          type="text" 
          placeholder="First Name" 
          onChange={onFormChange} 
          value={creditCardInput.fName}>
        </input>
        <label htmlFor="lName">Last Name</label>
        <input 
          id="lName"
          name="lName" 
          type="text" 
          placeholder="Last Name" 
          onChange={onFormChange} 
          value={creditCardInput.lName}>
        </input>
        <label htmlFor="address">Shipping Address</label>
        <input 
          id="address"
          name="address" 
          type="text" 
          placeholder="Shipping Address" 
          onChange={onFormChange} 
          value={creditCardInput.address}>
        </input>
        <label htmlFor="city">City</label>
        <input 
          id="city"
          name="city" 
          type="text" 
          placeholder="City" 
          onChange={onFormChange} 
          value={creditCardInput.city}>
        </input>
        <label htmlFor="state">State</label>
        <input 
          id="state"
          name="state" 
          type="text" 
          placeholder="State" 
          onChange={onFormChange} 
          value={creditCardInput.state}
          maxLength="2">
        </input>
        <label htmlFor="zip">Zip Code</label>
        <input 
          id="zip"
          name="zip" 
          type="text" 
          placeholder="Zip Code" 
          onChange={onFormChange} 
          value={creditCardInput.zip}
          maxLength="5">
        </input>
        <label htmlFor="card-element">
          Credit or Debit Card
        </label>
        <CardElement
          id="card-element"
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit Payment</button>
    </form>
  )
}

const stripePromise = loadStripe(process.env.REACT_APP_PUBLIC_KEY)

function App() {

  return (
    <Fragment>
      <h1>Credit Card Form</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </Fragment> 
  )
}

export default App;
