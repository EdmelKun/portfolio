import { Experience } from './components/Experience'
import { Hero } from './components/Hero'
import { Stack } from './components/Stack'
import { Work } from './components/Work'

export default function App() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 sm:px-8">
      <Hero />
      <Work />
      <Stack />
      <Experience />
    </div>
  )
}
