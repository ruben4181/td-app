import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Stores from "./views/Stores";
import Store from "./views/Store";
import Inventory from "./views/Inventory";
import POS from "./views/POS";
import Bills from "./views/Bills";
import Bill from './views/Bill';
import Suppliers from "./views/Suppliers";
import SupplierBills from "./views/SupplierBills";

export default function App (){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/stores" element={<Stores/>}/>
        <Route path="/store/:idStore" element={<Store/>}/>
        <Route path="/inventory/:idStore/:page" element={<Inventory/>}/>
        <Route path="/pos/:idStore/" element={<POS/>}/>
        <Route path="/bills/:idStore/:page" element={<Bills/>}/>
        <Route path="/bill/:idStore/:idBill" element={<Bill/>}/>
        <Route path="/suppliers/:idStore" element={<Suppliers/>}/>
        <Route path="/suppliers/costs/bills/:idStore" element={<SupplierBills/>}/>
      </Routes>
    </Router>
  )
}