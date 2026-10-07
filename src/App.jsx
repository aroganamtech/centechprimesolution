import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Solutions from './pages/Solutions';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Project from './pages/Project';
import Contact from './pages/Contact';

function Layout() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:bg-white focus:px-4 focus:py-2">Skip to content</a>
      <ScrollToTop />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none"><Outlet /></main>
      <Footer />
    </>
  );
}

// Routes mirror the live WordPress URLs (/about-4, /contact-2, /service/:slug, /project/:slug, posts at /:slug).
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about-4" element={<About />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="service/:slug" element={<ServiceDetail />} />
        <Route path="solutions" element={<Solutions />} />
        <Route path="blog" element={<Blog />} />
        <Route path="project/:slug" element={<Project />} />
        <Route path="contact-2" element={<Contact />} />
        <Route path="contact" element={<Contact />} />
        <Route path=":slug" element={<BlogPost />} />
      </Route>
    </Routes>
  );
}
