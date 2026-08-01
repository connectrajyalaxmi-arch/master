import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
// import About from "../components/About";
import Footer from "../components/Footer";
import Journey from "../components/Journey";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <br/>
      <br/>
      {/* <About /> */}
      <Journey/>
      <br/>
      <br/>
      <Footer />
    </>
  );
};

export default Home;