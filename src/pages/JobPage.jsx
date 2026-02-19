import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, DollarSign, Briefcase, Clock, Filter } from 'lucide-react';
import { jobs } from '../data/jobData';

const JobPage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="main-container" style={{ padding: '40px 20px' }}>
            <header style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
                    Find Your <span className="gradient-text">Next Chapter</span>
                </h1>
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    position: 'relative',
                    display: 'flex',
                    gap: '15px'
                }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <Search style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
                        <input
                            type="text"
                            placeholder="Search by role, company, or skills..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '15px 15px 15px 50px',
                                borderRadius: '15px',
                                border: '1px solid var(--border)',
                                background: 'var(--surface)',
                                color: 'white',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <button className="btn btn-primary" style={{ padding: '0 30px' }}>Search</button>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '25px' }}>
                {filteredJobs.map(job => (
                    <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        key={job.id}
                        className="glass-card"
                        style={{ padding: '25px' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <img
                                    src={job.logo}
                                    alt={job.company}
                                    style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'white', padding: '5px', objectFit: 'contain' }}
                                />
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{job.title}</h3>
                                    <p style={{ margin: '4px 0 0', color: 'var(--primary)', fontWeight: '600' }}>{job.company}</p>
                                </div>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '5px 10px', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                {job.posted}
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <MapPin size={16} /> {job.location}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <DollarSign size={16} /> {job.salary}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Briefcase size={16} /> {job.type}
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '25px' }}>
                            {job.tags.map(tag => (
                                <span key={tag} style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', border: '1px solid var(--glass-border)' }}>
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <button className="btn btn-primary" style={{ width: '100%' }}>Apply Now</button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default JobPage;
