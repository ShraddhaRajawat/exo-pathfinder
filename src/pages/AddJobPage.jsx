import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, DollarSign, Building, Tag, Send, Loader2 } from 'lucide-react';
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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Clean up tags
        const jobData = {
            ...formData,
            tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(t => t !== '') : []
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/api/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jobData)
            });

            const result = await response.json();

            if (response.ok) {
                alert('Job Posted Successfully! 🚀');
                navigate('/jobs');
            } else {
                alert('Error: ' + (result.message || 'Check if MongoDB is running locally.'));
            }
        } catch (error) {
            console.error('Submission Error:', error);
            alert('Error connecting to backend server. Make sure the server (port 5000) is running.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputStyle = {
        padding: '12px 15px 12px 45px',
        width: '100%',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '10px',
        color: 'white',
        outline: 'none',
        fontSize: '0.95rem'
    };

    return (
        <div className="main-container" style={{ padding: '60px 20px' }}>
            <header style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Post a <span className="gradient-text">New Opportunity</span></h1>
                <p style={{ color: 'var(--text-muted)' }}>Fill in the details to add this job to the global database.</p>
            </header>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card"
                style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}
            >
                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.9rem', fontWeight: '500' }}>Job Title</label>
                        <div style={{ position: 'relative' }}>
                            <Briefcase style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                            <input
                                style={inputStyle}
                                placeholder="e.g. Frontend Developer"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.9rem', fontWeight: '500' }}>Company Name</label>
                        <div style={{ position: 'relative' }}>
                            <Building style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                            <input
                                style={inputStyle}
                                placeholder="e.g. Google"
                                required
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.9rem', fontWeight: '500' }}>Location</label>
                        <div style={{ position: 'relative' }}>
                            <MapPin style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                            <input
                                style={inputStyle}
                                placeholder="e.g. Remote / Bangalore"
                                required
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.9rem', fontWeight: '500' }}>Salary Range</label>
                        <div style={{ position: 'relative' }}>
                            <DollarSign style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                            <input
                                style={inputStyle}
                                placeholder="e.g. 15LPA - 20LPA"
                                required
                                value={formData.salary}
                                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                            />
                        </div>
                    </div>

                    <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.9rem', fontWeight: '500' }}>Tags (comma separated)</label>
                        <div style={{ position: 'relative' }}>
                            <Tag style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                            <input
                                style={inputStyle}
                                placeholder="e.g. React, Node.js, TypeScript"
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                            gridColumn: '1 / -1',
                            padding: '16px',
                            fontSize: '1rem',
                            marginTop: '10px',
                            opacity: isSubmitting ? 0.7 : 1,
                            cursor: isSubmitting ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isSubmitting ? (
                            <><Loader2 className="animate-spin" size={20} /> Publishing...</>
                        ) : (
                            <><Send size={18} /> Publish Job Now</>
                        )}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AddJobPage;
