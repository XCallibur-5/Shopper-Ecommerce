
import './App.css';
import { Routes, Redirect, Route} from "react-router-dom";
import Cart from './Pages/Cart';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Product from './Pages/Product';
import ProductList from './Pages/ProductList';
import Register from './Pages/Register';
import AdminDashboard from './Pages/AdminDashboard';
import { useDispatch, useSelector } from "react-redux";

function App() {
  const user = useSelector((state)=>state.user.currentUser);
  console.log(user);
  let x = <Route path="/login" element={<Login />} />
  if (user!=null){
    x=<Route path="/login" element={<Home />} />
  }
  return (
    <div >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productlist/:category" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        {x}
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;