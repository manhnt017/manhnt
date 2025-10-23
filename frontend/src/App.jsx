import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import Notes from "./pages/Notes";
import Deal from "./pages/Deal";
import DealPano from "./pages/DealPano.jsx";
import DealTranhDien from "./pages/DealTranhDien";
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
/>



export default function App() {
  return (
    <Router>
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/deal/biennho" element={<Deal />} />
          <Route path="/deal/pano" element={<DealPano />} />
          <Route path="/deal/tranhdien" element={<DealTranhDien />} />
        </Routes>
      </div>
    </Router>
  );
}
