import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import GraphQLPanel from "./pages/GraphQLPanel";
import RealTime from "./pages/RealTimePanel";
import RestPanel from "./pages/RestPanel";

function App() {
  return (
    <Router>
      <div className="h-screen w-screen flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex flex-1 w-full border border-gray-700/30 overflow-hidden">
          <Sidebar />
          <div className="flex-1">
            <Routes>
              <Route path="/rest" element={<RestPanel />} />
              <Route path="/graphql" element={<GraphQLPanel />} />
              <Route path="/realtime" element={<RealTime />} />
              <Route path="*" element={<Navigate to="/rest" replace />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
