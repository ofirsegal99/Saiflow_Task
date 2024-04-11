import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from '@/pages/Home/Home.tsx'
import {
  Route,
  Routes,
} from "react-router-dom";
import NavigationBar from '@/layout/NavigationBar/NavigationBar';
import Sessions from '@/pages/Sessions/Sessions';
import "@/styles/root.scss";
import { BrowserRouter } from 'react-router-dom';
import Transaction from '@/pages/Transaction/Transaction';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Sessions' element={<Sessions />} />
        <Route path='/Transaction/:transactionId' element={<Transaction />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

