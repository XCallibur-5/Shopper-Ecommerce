
import './App.css';
import { Routes, Route} from "react-router-dom";
import Cart from './Pages/Cart';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Product from './Pages/Product';
import ProductList from './Pages/ProductList';
import Register from './Pages/Register';
import AdminDashboard from './Pages/AdminDashboard';
import OrderDashboard from './Pages/Order';
import Success from "./Pages/Success";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const user = useSelector((state)=>state.user.currentUser);
  console.log(user);

  return (
    <div >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productlist/:category" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/success" element={<Success />} />
        <Route path="/order" element={<OrderDashboard />} />
      </Routes>
    </div>
  );
}

export default App;