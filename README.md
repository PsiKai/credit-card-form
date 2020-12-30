# Credit Card Form

A simple, modular form for accepting credit card payments.

Technologies:

- Node.js,
- React.js

## Node Modules to install

### Backend:

- express,
- body-parser,
- cors,
- uuid,
- dotenv,
- stripe,
- concurrently -dev

### Frontend:

- @stripe/stripe-js,
- @stripe/react-stripe-js

### Scripts

- `npm init` to initialize Node
- `npx create-react-app client` to initialize React
  **_Note this will create a git repository in the client folder._**
  **_Run `rm rf .git` in the client folder to erase the nested repo._**

- `npm run dev` in the root directory to start the React server and the proxy Express server concurrently.

- `npm start` in the client directory for React server only.

- `nodemon app.js` in the root directory for Express server only.

### Description of application

This form uses the third party Stripe to handle payment requests from credit and debit cards. A new user will need to setup an account with Stripe to obtain API keys and place them in environment variables. The UI element for the card information is provided by Stripe.

Submitting a payment sends the form data to the Stripe dashboard, and the payment is taken care of on the Stripe servers without any need to store, or handle the card number, however the last 4 digits are saved for reference. The dashboard can be configured to payout completed charges directly to the user.
