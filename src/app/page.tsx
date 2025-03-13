import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MenuHighlights from "@/components/MenuHighlights";
import Gallery from "@/components/Gallery";
import Reservations from "@/components/Reservations";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <MenuHighlights />
      <Gallery />
      <Reservations />
      <Footer />
    </main>
  );
}
