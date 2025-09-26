import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/customer/Home';
import Exp from './components/Exp';
import CustomerLogin from './pages/customer/CustomerLogin';
import Delivery_partner_login from './pages/delivery_partner/Delivery_partner_login';
import Pikcer_packer_login from './pages/picker_packer/Pikcer_packer_login';
import ProductDetails from './pages/customer/ProductDetails';
import Cart from './pages/customer/Cart';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/exp' element={<Exp></Exp>}></Route>
      <Route path='/customer/login' element={<CustomerLogin></CustomerLogin>}></Route>
      <Route path='/deliveryPartner/login' element={<Delivery_partner_login></Delivery_partner_login>}></Route>
      <Route path='/pickerPacker/login' element={<Pikcer_packer_login></Pikcer_packer_login>}></Route>
      <Route path='/productDetails' element={<ProductDetails></ProductDetails>}></Route>
      <Route path='/Cart' element={<Cart></Cart>}></Route>
    </Routes>
    </>
  )
}

export default App
