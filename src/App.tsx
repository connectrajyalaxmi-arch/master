import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import Programs from "./pages/Programs";
import Partnership from "./pages/Partnership";
import PartnerCategory from "./pages/PartnerCategory";
import TrackStatus from "./pages/TrackStatus";
import InquiryPage from "./pages/Inquiry";
import AdminTracking from "./pages/AdminTracking";
import Learn from "./pages/Learn";

const ProtectedAdminRoute = ({ children }: { children: React.ReactElement }) => {
  const isAdminAuthorized = typeof window !== "undefined" && window.localStorage.getItem("nsfi_admin_authorized") === "true";

  return isAdminAuthorized ? children : <Navigate to="/track" replace />;
};

function App() {
  return (
    <div className="app-shell">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/partner" element={<Partnership />} />
          <Route path="/partner/:category" element={<PartnerCategory />} />
          <Route path="/track" element={<TrackStatus />} />
          <Route path="/inquiry" element={<InquiryPage />} />
          <Route path="/admin" element={<ProtectedAdminRoute><AdminTracking /></ProtectedAdminRoute>} />
          <Route path="/learn" element={<Learn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;