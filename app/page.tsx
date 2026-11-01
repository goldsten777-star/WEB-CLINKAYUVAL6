import { Header } from "@/components/Header";
import { Hero } from "@/components/hero/Hero";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <About />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
