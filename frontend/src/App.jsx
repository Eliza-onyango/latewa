import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Impact from './pages/Impact';
import Partners from './pages/Partners';
import Gallery from './pages/Gallery';
import GetInvolved from './pages/GetInvolved';
import News from './pages/News';
import Contact from './pages/Contact';
import Store from './pages/Store';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          {/* Admin routes without Header/Footer */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          
          {/* Public routes with Layout (Header/Footer/Toaster) */}
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/impact" element={<Impact />} />
                <Route path="/partners" element={<Partners />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/get-involved" element={<GetInvolved />} />
                <Route path="/news" element={<News />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/store" element={<Store />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/track-order" element={<OrderTracking />} />
                <Route path="/admin-login" element={<AdminLogin />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;

