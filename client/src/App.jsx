import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import Detail from './components/Details/Details';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
const BASE_URL = `http://localhost:3001`;

function App() {
  const [userId] = useState(1);

  useEffect(() => {
    axios.post(`${BASE_URL}/store/product/all`).then((result) => {
      return result.data;
    });
  }, []);

  return (
    <>
      <div>
        <NavBar />
      </div>
      <Routes>
        <Route path='/' element={<Home userId={userId} />}></Route>
        <Route path='/cart' element={<ShoppingCart userId={userId} />}></Route>
        <Route path='/detail/:id' element={<Detail />}></Route>
      </Routes>
    </>
  );
}

export default App;
