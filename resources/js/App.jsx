import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from '@/components/ui/use-toast';
import Layout from './Layout.jsx';
import Home from './pages/Home.jsx';
import Contact from './pages/Contact.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Donate from './pages/Donate.jsx';
import Impact from './pages/Impact.jsx';
import Mission from './pages/Mission.jsx';
import OrderSuccess from './pages/OrderSuccess.jsx';
import Shop from './pages/Shop.jsx';
import { AuthProvider } from './AuthContext.jsx';
import { CartProvider } from './CartContext.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ToastProvider>
                                        <AuthProvider>
                                            <CartProvider>
                                                <Router>
                                                    <Layout>
                                                        <Routes>                                    <Route path='/' element={<Home />} />
                                    <Route path='/contact' element={<Contact />} />
                                    <Route path='/cart' element={<Cart />} />
                                    <Route path='/checkout' element={<Checkout />} />
                                    <Route path='/donate' element={<Donate />} />
                                    <Route path='/impact' element={<Impact />} />
                                    <Route path='/mission' element={<Mission />} />
                                    <Route path='/order-success' element={<OrderSuccess />} />
                                    <Route path='/shop' element={<Shop />} />
                                    <Route path='/login' element={<Login />} />
                                    <Route path='/register' element={<Register />} />
                                </Routes>
                            </Layout>
                        </Router>
                    </CartProvider>
                </AuthProvider>
            </ToastProvider>
        </QueryClientProvider>
    );
}
export default App;
