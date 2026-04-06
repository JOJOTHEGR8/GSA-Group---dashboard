import { BrowserRouter, Routes, Route } from "react-router-dom";
import GSADashboard from "./GSADashboard";
import Team from "./Team";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GSADashboard />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
