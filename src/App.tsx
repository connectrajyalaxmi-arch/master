import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Programs from "./pages/Programs";
// import Partnership from "./pages/Partnership";
// import PartnerCategory from "./pages/PartnerCategory";
// import TrackStatus from "./pages/TrackStatus";
// import InquiryPage from "./pages/Inquiry";
import AdminTracking from "./pages/AdminTracking";
import Learn from "./pages/Learn";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Students from "./pages/Students";
import Colleges from "./pages/Colleges";
import Organizations from "./pages/Organizations";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Faq from "./pages/Faq";

const ProtectedUserRoute = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const isUserLoggedIn =
    typeof window !== "undefined" &&
    Boolean(
      window.localStorage.getItem("nsfi_user_email") ||
        window.sessionStorage.getItem("nsfi_user_email")
    );

  return isUserLoggedIn ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <main className="app-shell">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Students />} />
<Route path="/colleges" element={<Colleges />} />
<Route path="/organizations" element={<Organizations />} />
<Route path="/about" element={<About />} />
        <Route path="/faqs" element={<Faq />} />

        <Route path="/programs" element={<Programs />} />

        {/* <Route path="/partner" element={<Partnership />} /> */}
<Route path="/contact" element={<Contact/>} />
        {/* <Route
          path="/partner/:category"
          element={<PartnerCategory />}
        /> */}

        {/* <Route path="/track" element={<TrackStatus />} /> */}

        {/* <Route path="/inquiry" element={<InquiryPage />} /> */}

        <Route path="/admin" element={<AdminTracking />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/profile"
          element={
            <ProtectedUserRoute>
              <Profile />
            </ProtectedUserRoute>
          }
        />

        <Route path="/learn" element={<Learn />} />
        
      </Routes>
      </main>
    </Router>
  );
}

export default App;
