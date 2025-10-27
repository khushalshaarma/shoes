
import { Routes, Route } from "react-router-dom"; // 👈 add this
import SmoothScroll from "./components/SmoothScroll";
import Scene3D from "./components/Scene3D";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import ProductShowcase from "./components/ProductShowcase";
import FeaturedProduct from "./components/FeaturedProduct";
import ProductGrid from "./components/ProductGrid";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import ShoeScroll from "./components/ShoeScroll";
import SearchPage from "./components/SearchPage"; // 👈 create this file


function App() {
  return (
    <Routes>
      {/* Homepage */}
      <Route
        path="/"
        element={
          <SmoothScroll>
            <div className="relative min-h-screen">
              <Scene3D />
              <div className="relative z-10">
                <Header />
                <Hero />
                <Features />
                <ProductShowcase />
                <FeaturedProduct />
                <ProductGrid />
                <ShoeScroll />
                <FinalCTA />
                <Footer />
              </div>
            </div>
          </SmoothScroll>
        }
      />

      {/* Search Page */}
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default App;
