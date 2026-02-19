import React from 'react';
import { motion } from 'framer-motion';
import { FileText, PlayCircle, BookCheck, ArrowRight } from 'lucide-react';
import { prepResources } from '../data/prepData';

const PrepPage = () => {
    return (
        <div className="main-container" style={{ padding: '40px 20px' }}>
            <header style={{ marginBottom: '60px' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
                    Preparation <span className="gradient-text">Resources</span>
                </h1>
                <p style={{ color: 'var(--text-muted)' }}>Everything you need to crack Aptitude, Technical, and HR rounds.</p>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
                {prepResources.map((section) => (
                    <div key={section.id}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
                            <h2 style={{ fontSize: '1.8rem' }}>{section.category}</h2>
                            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                            {section.items.map((item, index) => (
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    key={index}
                                    className="glass-card"
                                    style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '10px',
                                            background: `rgba(${parseInt(item.color.slice(1, 3), 16)}, ${parseInt(item.color.slice(3, 5), 16)}, ${parseInt(item.color.slice(5, 7), 16)}, 0.1)`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: item.color
                                        }}>
                                            {item.type === 'Notes' ? <FileText size={20} /> : item.type === 'Practice' ? <BookCheck size={20} /> : <PlayCircle size={20} />}
                                        </div>
                                        <div>
                                            <h4 style={{ margin: 0 }}>{item.title}</h4>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.type}</span>
                                        </div>
                                    </div>
                                    <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                                        <ArrowRight size={18} />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PrepPage;
