import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import CataloguePage from "./Pages/CataloguePage";
import ProductPage from "./Pages/ProductPage";
import LoginPage from "./Pages/LoginPage";
import AdminDashboard from "./Pages/AdminDashboard";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogue" element={<CataloguePage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminDashboard/>} />
        </Routes>
      </BrowserRouter>
  );
}