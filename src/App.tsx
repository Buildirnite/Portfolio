import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomCursor from './components/animations/CustomCursor';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900 font-sans">
      <CustomCursor />
      <Navbar />

      <main className="flex-1 pt-16">
        {/* Placeholder sections — replace with real content */}
        <section id="inicio" className="min-h-screen flex items-center justify-center px-6">
          <p className="text-zinc-400 text-lg">Hero — próximamente</p>
        </section>

        <section id="proyectos" className="min-h-screen flex items-center justify-center px-6">
          <p className="text-zinc-400 text-lg">Proyectos — próximamente</p>
        </section>

        <section id="stack" className="min-h-screen flex items-center justify-center px-6">
          <p className="text-zinc-400 text-lg">Stack — próximamente</p>
        </section>

        <section id="sobre-mi" className="min-h-screen flex items-center justify-center px-6">
          <p className="text-zinc-400 text-lg">Sobre mí — próximamente</p>
        </section>

        <section id="blog" className="min-h-screen flex items-center justify-center px-6">
          <p className="text-zinc-400 text-lg">Blog — próximamente</p>
        </section>

        <section id="contactar" className="min-h-screen flex items-center justify-center px-6">
          <p className="text-zinc-400 text-lg">Contactar — próximamente</p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
