import './App.css';

import { AuthProvider } from './contexts/Auth';
import { OrderProvider } from './contexts/Order';

import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { About } from './components/About/About';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Logout } from './components/Logout/Logout';
import { OrderPage } from './components/Orders/OrderPage/OrderPage';
import { OrderForm } from './components/Orders/OrderForm/OrderForm';
import { CreateOrder } from './components/Orders/CreateOrder/CreateOrder';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />


        <OrderProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />

            <Route path="/orders" element={<OrderPage />} />
            <Route path="/orders/create" element={<CreateOrder />} />
          </Routes>
        </OrderProvider>
      </div>
    </AuthProvider>
  );
}

export default App;
