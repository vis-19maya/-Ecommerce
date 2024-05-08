import React, { useContext } from "react";
import "./CSS/PlaceOrder.css";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const {getTotalCartAmount } = useContext(ShopContext)
  const navigate = useNavigate();
  return (
    <div>
      <form className='place-order'>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <div />
            <input type="text" placeholder="Email Address" />
            <input type="text" placeholder="Street" />
            <div className="multi-fields">
              <input type="text" placeholder="City" />
              <input type="text" placeholder="State" />
            </div>
            <div className="multi-fields">
              <input type="text" placeholder="Zip Code" />
              <input type="text" placeholder="Country" />
            </div>
            <input type="text" placeholder="Phone" />
          </div>
        <div className="place-order-right">
          <div className="cartitems-total">
            <h1>Cart Totals</h1>
           <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>Rs.{getTotalCartAmount()}</p>
           </div>
           <hr />
           <div className="cartitems-totsl-item">
             <p>Shipping Fee</p>
             <p>Free</p>
           </div>
           <hr />
           <div className="cartitems-total-item">
             <p>Total</p>
             <p>Rs.{getTotalCartAmount()}</p>
           </div>
          </div>
          <button onClick={() =>navigate('/payment')}>PROCEED TO PAYMENT</button>
        </div>
        </div>
      </form>
    </div>
  )
}

export default PlaceOrder;
