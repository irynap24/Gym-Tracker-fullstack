import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Workouts from "./pages/Workouts.jsx";
import History from "./pages/History.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/workouts" element={<Workouts></Workouts>} />
        <Route path="/history" element={<History></History>} />
      </Routes>
    </Router>
  );
}

export default App;
