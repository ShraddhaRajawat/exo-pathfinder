import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Briefcase, BookOpen, Building2, Code2, Search, ArrowRight, Star, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import DSAPage from './pages/DSAPage';
import JobPage from './pages/JobPage';
import CompanyPage from './pages/CompanyPage';
import PrepPage from './pages/PrepPage';
import LoginPage from './pages/LoginPage';
import AddJobPage from './pages/AddJobPage';

// Mock Pages (will be expanded)
const Home = () => (
  <div className="main-container">
    <header style={{ padding: '60px 0', textAlign: 'center' }}>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ fontSize: '4rem', marginBottom: '20px' }}
      >
        Your Path to <span className="gradient-text">Dream Career</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 40px' }}
      >
        Join 50,000+ students landing jobs at top tech companies. From DSA prep to hiring processes, we have it all.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}
      >
        <button className="btn btn-primary">Get Started <ArrowRight size={20} /></button>
        <button className="btn" style={{ background: 'var(--surface)', color: 'white' }}>View Job Board</button>
      </motion.div>
    </header>

    <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', margin: '40px 0' }}>
      <FeatureCard
        icon={<Briefcase color="#38bdf8" />}
        title="Job Portal"
        desc="Curated job listings from top startups and tech giants with easy apply."
        link="/jobs"
      />
      <FeatureCard
        icon={<BookOpen color="#38bdf8" />}
        title="Preparation"
        desc="Master Aptitude, Technical, and HR rounds with our expert notes."
        link="/prep"
      />
      <FeatureCard
        icon={<Building2 color="#38bdf8" />}
        title="Hiring Process"
        desc="Step-by-step guides for company-specific interview patterns."
        link="/hiring"
      />
      <FeatureCard
        icon={<Code2 color="#38bdf8" />}
        title="DSA Prep"
        desc="Topic-wise sheets and practice problems to ace coding interviews."
        link="/dsa"
      />
    </section>
  </div>
);

const FeatureCard = ({ icon, title, desc, link }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="glass-card"
    style={{ padding: '30px' }}
  >
    <div style={{ background: 'rgba(255,255,255,0.05)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
      {icon}
    </div>
    <h3 style={{ marginBottom: '15px' }}>{title}</h3>
    <p style={{ color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.6' }}>{desc}</p>
    <Link to={link} className="gradient-text" style={{ fontWeight: '600', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
      Learn More <ArrowRight size={16} />
    </Link>
  </motion.div>
);

import { useAuth } from './context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: '20px 0', borderBottom: '1px solid var(--border)', background: 'var(--glass)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="main-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: '800', textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '35px', height: '35px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Star size={20} fill="white" />
          </div>
          Pathfinder
        </Link>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <Link to="/jobs" style={{ textDecoration: 'none', color: 'var(--text-muted)', fontWeight: '500' }}>Jobs</Link>
          <Link to="/prep" style={{ textDecoration: 'none', color: 'var(--text-muted)', fontWeight: '500' }}>Preparation</Link>
          <Link to="/dsa" style={{ textDecoration: 'none', color: 'var(--text-muted)', fontWeight: '500' }}>DSA</Link>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src={user.avatar} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--primary)' }} alt="Profile" />
                <span style={{ fontSize: '0.9rem', color: 'white' }}>{user.name}</span>
              </div>
              <button
                onClick={logout}
                style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', fontSize: '0.9rem' }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary" style={{ padding: '8px 20px', textDecoration: 'none' }}>Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
};


const Footer = () => (
  <footer style={{ borderTop: '1px solid var(--border)', padding: '60px 0', marginTop: '80px', background: 'var(--glass)' }}>
    <div className="main-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
      <div>
        <h3 style={{ marginBottom: '20px' }}>Pathfinder</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
          Empowering the next generation of software engineers with the best resources and job opportunities.
        </p>
      </div>
      <div>
        <h4 style={{ marginBottom: '20px' }}>Quick Links</h4>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <li><Link to="/jobs" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Job Portal</Link></li>
          <li><Link to="/dsa" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>DSA Sheet</Link></li>
          <li><Link to="/prep" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Preparation</Link></li>
        </ul>
      </div>
      <div>
        <h4 style={{ marginBottom: '20px' }}>Connect</h4>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <li style={{ color: 'var(--text-muted)' }}>
            <a href="https://www.linkedin.com/in/shraddha-rajawat-26060428a/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a>
          </li>
          <li style={{ color: 'var(--text-muted)' }}>WhatsApp: +91 6306353376</li>
          <li style={{ color: 'var(--text-muted)' }}>Discord</li>
        </ul>
      </div>
    </div>
    <div className="main-container" style={{ textAlign: 'center', marginTop: '40px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
      © 2026 Pathfinder. All rights reserved.
    </div>
  </footer>
);

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobPage />} />
        <Route path="/prep" element={<PrepPage />} />
        <Route path="/hiring" element={<CompanyPage />} />
        <Route path="/dsa" element={<DSAPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/add-job" element={<AddJobPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
