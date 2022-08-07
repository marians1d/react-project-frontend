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
import { OrdersPage } from './components/Orders/OrdersPage/OrdersPage';
import { CreateOrder } from './components/Orders/CreateOrder/CreateOrder';
import { OrderDetails } from './components/Orders/OrderDetails/OrderDetails';
import { EditOrder } from './components/Orders/EditOrder/EditOrder';

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

            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/create" element={<CreateOrder />} />
            <Route path="/orders/:orderId" element={<OrderDetails />} />
            <Route path="/orders/:orderId/edit" element={<EditOrder />} />
          </Routes>
        </OrderProvider>
      </div>
    </AuthProvider>
  );
}

export default App;
