import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import HotPotato from "./pages/HotPotato/HotPotato.tsx";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hotpotato" element={<HotPotato />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
