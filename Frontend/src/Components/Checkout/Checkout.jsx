import * as React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51PCcnaSHKuQCxiGENTAEkrIJHlxcPfOedGPsmAxYec2arMedO26XEhL9yBnsk9X9wuyPEHdQrs7jUDHrFN5qN9ss00WbmAIJBs');

const Checkout = () => {

    const fetchClientSecret = React.useCallback(() => {
       
      return fetch("http://localhost:4000/create-checkout-session", {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => data.clientSecret);
    }, []);



  const options = {fetchClientSecret};

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};
export default Checkout;