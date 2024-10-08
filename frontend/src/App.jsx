import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Workouts from "./pages/Workouts"; // Ensure Workouts component is imported
import History from "./pages/History";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workouts" element={<Workouts />} />{" "}
        {/* Route for Workouts */}
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
