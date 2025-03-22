import {Route, Routes } from 'react-router-dom';
import './App.css'
import Layout from './Layout';
import Index from './pages/Index';
import ViewProduct from './pages/ViewProduct';
import EditProduct from './pages/EditProduct';
import ViewUser from './pages/ViewUser';
import EditUser from './pages/EditUser';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="/products/:id" element={<ViewProduct />} />
        <Route path="/products/:id/edit" element={<EditProduct />} />
        <Route path="/users/:id" element={<ViewUser />} />
        <Route path="/users/:id/edit" element={<EditUser />} />
      </Route>
    </Routes>
  )
}

export default App;
