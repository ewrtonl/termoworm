import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import HotPotato from "./pages/HotPotato/HotPotato.tsx";
import Info from "./pages/Info/Info.tsx";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hotpotato" element={<HotPotato />} />
      <Route path="/howtoplay" element={<Info />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
