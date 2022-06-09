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

export default function App (){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/stores" element={<Stores/>}/>
        <Route path="/store/:id" element={<Store/>}/>
        <Route path="/inventory/:id/:page" element={<Inventory/>}/>
        <Route path="/pos/:id/" element={<POS/>}/>
        <Route path="/bills/:id/:page" element={<Bills/>}/>
        <Route path="/bill/:idStore/:idBill" element={<Bill/>}/>
      </Routes>
    </Router>
  )
}