import './App.css';

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
import { NoMatch } from './components/NoMatch';
import { APIErrorNotification } from './components/APIErrorNotification/APIErrorNotification';
import PrivateRoute from './components/common/PrivateRoute';
import OrderOwner from './components/common/OrderOwner';
import PublicRoute from './components/common/PublicRoute';
import { MyOrders } from './components/Orders/MyOrders/MyOrders';

function App() {
  return (
    <div className="App">
      <APIErrorNotification />
      <Header />

      <main className='main'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route element={<PublicRoute />} >
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/logout" element={<Logout />} />
          </Route>

          <Route path="/orders" element={<OrdersPage />} />
          <Route element={<PrivateRoute />} >
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/orders/create" element={<CreateOrder />} />
          </Route>
          <Route path="/orders/:orderId" element={<OrderDetails />} />
          <Route path="/orders/:orderId/edit" element={
            <OrderOwner>
              <EditOrder />
            </OrderOwner>
          } />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
