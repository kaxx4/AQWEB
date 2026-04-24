import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Clone from './pages/Clone'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'
import About from './pages/About'
import Contact from './pages/Contact'
import Collaborations from './pages/Collaborations'
import SupportUs from './pages/SupportUs'
import Links from './pages/Links'
import NotFound from './pages/NotFound'
import VolunteerHandbook from './pages/VolunteerHandbook'
import VolunteerApply from './pages/VolunteerApply'
import VolunteerThankYou from './pages/VolunteerThankYou'

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
        <Route path="/support" element={<SupportUs />} />
        <Route path="/links" element={<Links />} />
        <Route path="/volunteer" element={<VolunteerHandbook />} />
        <Route path="/volunteer/apply" element={<VolunteerApply />} />
        <Route path="/volunteer/thank-you" element={<VolunteerThankYou />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
