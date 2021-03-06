
import './App.css';
import { Routes, Route} from "react-router-dom";
import Cart from './Pages/Cart';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Product from './Pages/Product';
import ProductList from './Pages/ProductList';
import Register from './Pages/Register';
import AdminDashboard from './Pages/AdminDashboard';
import AdminAddProduct from './Pages/AdminAddProduct';
import OrderDashboard from './Pages/Order';
import OrderIndividual from './Pages/OrderIndividual';
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state)=>state.user.currentUser);
  //console.log(user);

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
        <Route path="/orders/:id" element={<OrderIndividual />} />
        <Route path={user!=null?'/order/find/'+user._id:'/order/find/'} element={<OrderDashboard />} />
        <Route path="/adminAddProduct" element={<AdminAddProduct />} />
      </Routes>
    </div>
  );
}

export default App;