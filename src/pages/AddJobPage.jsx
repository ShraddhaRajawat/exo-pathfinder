import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, DollarSign, Building, Tag, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddJobPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        salary: '',
        type: 'Full-time',
        tags: ''
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const jobData = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim())
        };

        try {
            const response = await fetch('http://localhost:5000/api/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jobData)
            });
            if (response.ok) {
                alert('Job Posted Successfully!');
                navigate('/jobs');
            }
        } catch (error) {
            alert('Error connecting to backend database.');
        }
    };

    return (
        <div className="main-container" style={{ padding: '40px 20px' }}>
            <header style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.5rem' }}>Post a <span className="gradient-text">New Job</span></h1>
                <p style={{ color: 'var(--text-muted)' }}>Fill in the details to add a job to the database.</p>
            </header>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card"
                style={{ padding: '40px', maxWidth: '800px' }}
            >
                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem' }}>Job Title</label>
                        <div style={{ position: 'relative' }}>
                            <Briefcase style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                            <input
                                className="input-field"
                                style={{ paddingLeft: '45px', width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', color: 'white', height: '45px' }}
                                placeholder="e.g. Frontend Developer"
                                required
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem' }}>Company Name</label>
                        <div style={{ position: 'relative' }}>
                            <Building style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                            <input
                                className="input-field"
                                style={{ paddingLeft: '45px', width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', color: 'white', height: '45px' }}
                                placeholder="e.g. Google"
                                required
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem' }}>Location</label>
                        <div style={{ position: 'relative' }}>
                            <MapPin style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                            <input
                                className="input-field"
                                style={{ paddingLeft: '45px', width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', color: 'white', height: '45px' }}
                                placeholder="e.g. Remote, Bangalore"
                                required
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem' }}>Salary</label>
                        <div style={{ position: 'relative' }}>
                            <DollarSign style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                            <input
                                className="input-field"
                                style={{ paddingLeft: '45px', width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', color: 'white', height: '45px' }}
                                placeholder="e.g. $120k - $150k"
                                required
                                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                            />
                        </div>
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem' }}>Tags (comma separated)</label>
                        <div style={{ position: 'relative' }}>
                            <Tag style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                            <input
                                className="input-field"
                                style={{ paddingLeft: '45px', width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', color: 'white', height: '45px' }}
                                placeholder="e.g. React, Node, AWS"
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                            />
                        </div>
                    </div>

                    <button className="btn btn-primary" type="submit" style={{ gridColumn: 'span 2', padding: '15px', marginTop: '10px' }}>
                        Publish Job <Send size={18} style={{ marginLeft: '10px' }} />
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AddJobPage;
