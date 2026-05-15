import { lazy, Suspense } from 'react';
import SEO from './components/layout/SEO';
import CustomCursor from './components/animations/CustomCursor';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

const HeroSection        = lazy(() => import('@/components/sections/HeroSection'));
const AboutSection       = lazy(() => import('@/components/sections/AboutSection'));
const StackSection       = lazy(() => import('@/components/sections/StackSection'));
const ProjectsSection    = lazy(() => import('@/components/sections/ProjectsSection'));
const TrayectoriaSection = lazy(() => import('@/components/sections/TrayectoriaSection'));
const ContactSection     = lazy(() => import('@/components/sections/ContactSection'));

function SectionsSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]" aria-label="Cargando">
      <span className="w-8 h-8 rounded-full border-2 border-violet-200 border-t-violet-600 animate-spin" />
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f3ff] dark:bg-[#0f0a1e] text-zinc-900 dark:text-[#f0f0f0] font-sans overflow-x-hidden">
      <SEO />
      <CustomCursor />
      <Navbar />

      <main className="flex-1 pt-16">
        <Suspense fallback={<SectionsSpinner />}>
          <HeroSection />
          <AboutSection />
          <StackSection />
          <ProjectsSection />
          <TrayectoriaSection />
          <ContactSection />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default App;
