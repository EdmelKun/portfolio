import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Stack } from './components/Stack'
import { Work } from './components/Work'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-sm border border-client bg-ground-bottom px-4 py-2 font-mono text-sm text-client focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-60"
      >
        skip to content
      </a>

      <Nav />

      <main id="main" className="mx-auto w-full max-w-5xl px-6 sm:px-8">
        <Hero />
        <Work />
        <Stack />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
