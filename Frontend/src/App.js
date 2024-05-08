
import './App.css';
import Navbar  from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/men_banner.jpg'
import women_banner from './Components/Assets/women_banner.jpg'
import kid_banner from './Components/Assets/kide_banner.jpg'
import Checkout from './Components/Checkout/Checkout';
import UserProfileCard from './Components/UserProfileCard/UserProfileCard';
import Admin from './Pages/Admin/Admin'
import ListProduct from './Components/ListProduct/ListProduct';
import AddProduct from './Components/AddProduct/AddProduct';

function App() {
 
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/mens' element={<ShopCategory banner={men_banner} category="men"/>}/>
        <Route path='/womens' element={<ShopCategory banner={women_banner} category="women"/>}/>
        <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid"/>}/>
        <Route path="product" element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>    
        <Route path='/payment' element={<Checkout/>}/>
        <Route path='/userprofile' element={<UserProfileCard/>}/>
         <Route path='/adminpanel' element={<Admin/>}/>
         <Route path='/addproduct' element={<AddProduct/>}/>
         <Route path='/listproduct' element={<ListProduct/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
  
    </div>
  );
}

export default App;
