import CustomCursor from './components/animations/CustomCursor';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import ProjectsSection from './components/sections/ProjectsSection';
import StackSection from './components/sections/StackSection';
import AboutSection from './components/sections/AboutSection';
import BlogSection from './components/sections/BlogSection';
import ContactSection from './components/sections/ContactSection';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900 font-sans">
      <CustomCursor />
      <Navbar />

      <main className="flex-1 pt-16">
        <HeroSection />       {/* id="inicio"    */}
        <ProjectsSection />   {/* id="proyectos" */}
        <StackSection />      {/* id="stack"     */}
        <AboutSection />      {/* id="sobre-mi"  */}
        <BlogSection />       {/* id="blog"      */}
        <ContactSection />    {/* id="contacto"  */}
      </main>

      <Footer />
    </div>
  );
}

export default App;
