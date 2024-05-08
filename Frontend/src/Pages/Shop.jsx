import React from "react";
import Hero from "../Components/Hero/Hero";
import Product from "../Components/Popular/Popular";
import NewCollections from "../Components/NewCollections/NewCollections";
import Offers from "../Components/Offers/Offers";
const Shop = () => {
    return(
        <>
        <div>
    
       <Hero/>
       <Product/>
       <Offers/>
       <NewCollections/>
       </div>
       
</>

    
    )
}
export default Shop;