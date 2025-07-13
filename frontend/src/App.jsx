import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllLinks from "./components/AllLinks";
import Navbar from "./components/Navbar";
import Stats from "./components/Stats"; 

function App() {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Router>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<AllLinks />} />
          <Route path="/:id/stats" element={<Stats />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
