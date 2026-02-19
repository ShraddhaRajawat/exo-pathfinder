import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, PlayCircle, BookCheck, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { prepResources } from '../data/prepData';

const PrepPage = () => {
    const [expandedItem, setExpandedItem] = useState(null);

    const toggleExpand = (sectionId, itemIndex) => {
        const key = `${sectionId}-${itemIndex}`;
        setExpandedItem(expandedItem === key ? null : key);
    };

    return (
        <div className="main-container" style={{ padding: '40px 20px' }}>
            <header style={{ marginBottom: '60px' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
                    Preparation <span className="gradient-text">Resources</span>
                </h1>
                <p style={{ color: 'var(--text-muted)' }}>Foundational notes and interview content for key rounds.</p>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
                {prepResources.map((section) => (
                    <div key={section.id}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
                            <h2 style={{ fontSize: '1.8rem' }}>{section.category}</h2>
                            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
                            {section.items.map((item, index) => {
                                const isExpanded = expandedItem === `${section.id}-${index}`;
                                return (
                                    <motion.div
                                        layout
                                        key={index}
                                        className="glass-card"
                                        style={{
                                            padding: '20px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            cursor: 'pointer',
                                            border: isExpanded ? '1px solid var(--primary)' : '1px solid var(--glass-border)',
                                            background: isExpanded ? 'rgba(12, 170, 245, 0.05)' : 'var(--glass)'
                                        }}
                                        onClick={() => toggleExpand(section.id, index)}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                <div style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    borderRadius: '10px',
                                                    background: 'rgba(12, 170, 245, 0.1)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'var(--primary)'
                                                }}>
                                                    {item.type === 'Notes' ? <FileText size={20} /> : item.type === 'Practice' ? <BookCheck size={20} /> : <PlayCircle size={20} />}
                                                </div>
                                                <div>
                                                    <h4 style={{ margin: 0 }}>{item.title}</h4>
                                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.type}</span>
                                                </div>
                                            </div>
                                            <div style={{ color: 'var(--text-muted)' }}>
                                                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                            </div>
                                        </div>

                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    style={{ overflow: 'hidden' }}
                                                >
                                                    <div style={{
                                                        marginTop: '20px',
                                                        paddingTop: '15px',
                                                        borderTop: '1px solid var(--border)',
                                                        fontSize: '0.95rem',
                                                        lineHeight: '1.6',
                                                        color: 'var(--text-muted)'
                                                    }}>
                                                        {item.content}
                                                        <div style={{ marginTop: '15px' }}>
                                                            <button className="btn" style={{ background: 'var(--surface)', color: 'white', padding: '8px 15px', fontSize: '0.85rem' }}>
                                                                Full Notes <ArrowRight size={14} style={{ marginLeft: '5px' }} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PrepPage;
