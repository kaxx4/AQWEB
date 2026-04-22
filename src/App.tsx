import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Clone from './pages/Clone'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'
import About from './pages/About'
import Contact from './pages/Contact'
import Collaborations from './pages/Collaborations'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Clone />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/collaborations" element={<Collaborations />} />
      </Routes>
    </BrowserRouter>
  )
}
