import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Briefcase, MapPin, DollarSign, Filter, ExternalLink, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobPage = () => {
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('/api/jobs');
                const data = await response.json();
                setJobs(data);
            } catch (error) {
                console.error('Failed to fetch jobs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="main-container" style={{ padding: '40px 20px' }}>
            <header style={{ marginBottom: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
                        Find Your <span className="gradient-text">Dream Job</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>Curated opportunities from high-growth startups and tech giants.</p>
                </div>
                <Link to="/add-job" className="btn btn-primary" style={{ padding: '12px 25px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Plus size={20} /> Post a Job
                </Link>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '30px' }}>
                <aside>
                    <div className="glass-card" style={{ padding: '25px', position: 'sticky', top: '100px' }}>
                        <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Filter size={18} /> Filters
                        </h3>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Search Role</label>
                            <div style={{ position: 'relative' }}>
                                <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={16} />
                                <input
                                    type="text"
                                    placeholder="Search jobs..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px 10px 10px 38px',
                                        borderRadius: '8px',
                                        background: 'var(--surface)',
                                        border: '1px solid var(--border)',
                                        color: 'white',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </aside>

                <main>
                    {loading ? (
                        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading jobs from database...</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <AnimatePresence>
                                {filteredJobs.length > 0 ? filteredJobs.map((job, index) => (
                                    <motion.div
                                        key={job._id || index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="glass-card"
                                        style={{ padding: '25px', display: 'flex', gap: '25px', alignItems: 'center' }}
                                    >
                                        <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: 'white', overflow: 'hidden', padding: '10px' }}>
                                            <img src={job.logo || 'https://cdn-icons-png.flaticon.com/512/281/281744.png'} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt={job.company} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ marginBottom: '5px' }}>{job.title}</h3>
                                            <div style={{ display: 'flex', gap: '20px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Briefcase size={14} /> {job.company}</span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><MapPin size={14} /> {job.location}</span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><DollarSign size={14} /> {job.salary}</span>
                                            </div>
                                            <div style={{ display: 'flex', gap: '8px', marginTop: '15px' }}>
                                                {job.tags && job.tags.map((tag, i) => (
                                                    <span key={i} style={{ padding: '4px 10px', borderRadius: '20px', background: 'var(--surface)', fontSize: '0.75rem', border: '1px solid var(--border)', color: 'var(--primary)' }}>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <button className="btn btn-primary" style={{ padding: '10px 20px' }}>
                                            Apply <ExternalLink size={16} style={{ marginLeft: '8px' }} />
                                        </button>
                                    </motion.div>
                                )) : (
                                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '40px' }}>No jobs found matching your search.</p>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default JobPage;
