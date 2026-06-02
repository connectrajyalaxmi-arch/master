import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Programs from "./pages/Programs";
import Partnership from "./pages/Partnership";
import PartnerCategory from "./pages/PartnerCategory";
import TrackStatus from "./pages/TrackStatus";
import InquiryPage from "./pages/Inquiry";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/partner" element={<Partnership />} />
        <Route path="/partner/:category" element={<PartnerCategory />} />
        <Route path="/track" element={<TrackStatus />} />
        <Route path="/inquiry" element={<InquiryPage />} />
      </Routes>
    </Router>
  );
}

export default App;