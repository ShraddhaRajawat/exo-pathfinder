import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, ExternalLink, ChevronRight, Trophy, BookOpen } from 'lucide-react';
import { dsaTopics } from '../data/dsaData';

const DSAPage = () => {
    const [selectedTopic, setSelectedTopic] = useState(dsaTopics[0]);
    const [completedProblems, setCompletedProblems] = useState(new Set());

    const toggleProblem = (id) => {
        const newCompleted = new Set(completedProblems);
        if (newCompleted.has(id)) {
            newCompleted.delete(id);
        } else {
            newCompleted.add(id);
        }
        setCompletedProblems(newCompleted);
    };

    const calculateProgress = (topic) => {
        const topicProblems = topic.problems.map(p => p.id);
        const completed = topicProblems.filter(id => completedProblems.has(id)).length;
        return (completed / topicProblems.length) * 100;
    };

    return (
        <div className="main-container" style={{ padding: '40px 20px' }}>
            <header style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
                    DSA <span className="gradient-text">Mastery Sheet</span>
                </h1>
                <p style={{ color: 'var(--text-muted)' }}>Master data structures and algorithms topic-wise with handpicked problems.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '30px' }}>
                {/* Sidebar Topics */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {dsaTopics.map(topic => (
                        <div
                            key={topic.id}
                            onClick={() => setSelectedTopic(topic)}
                            className="glass-card"
                            style={{
                                padding: '15px 20px',
                                cursor: 'pointer',
                                border: selectedTopic.id === topic.id ? '1px solid var(--primary)' : '1px solid var(--glass-border)',
                                background: selectedTopic.id === topic.id ? 'rgba(99, 102, 241, 0.1)' : 'var(--glass)'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <h4 style={{ margin: 0 }}>{topic.title}</h4>
                                <ChevronRight size={16} />
                            </div>
                            <div style={{ width: '100%', height: '4px', background: 'var(--surface)', borderRadius: '2px' }}>
                                <div
                                    style={{
                                        width: `${calculateProgress(topic)}%`,
                                        height: '100%',
                                        background: 'var(--primary)',
                                        borderRadius: '2px',
                                        transition: 'width 0.3s ease'
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Problem List */}
                <div className="glass-card" style={{ padding: '30px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                        <div>
                            <h2>{selectedTopic.title}</h2>
                            <p style={{ color: 'var(--text-muted)' }}>{selectedTopic.description}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '5px' }}>Topic Progress</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                                {Math.round(calculateProgress(selectedTopic))}%
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {selectedTopic.problems.map(problem => (
                            <div
                                key={problem.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '15px 20px',
                                    background: 'rgba(255,255,255,0.03)',
                                    borderRadius: '12px',
                                    border: '1px solid var(--glass-border)'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <div
                                        onClick={() => toggleProblem(problem.id)}
                                        style={{ cursor: 'pointer', color: completedProblems.has(problem.id) ? 'var(--accent)' : 'var(--text-muted)' }}
                                    >
                                        {completedProblems.has(problem.id) ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                                    </div>
                                    <div>
                                        <h4 style={{ margin: 0 }}>{problem.title}</h4>
                                        <span style={{
                                            fontSize: '0.75rem',
                                            padding: '2px 8px',
                                            borderRadius: '4px',
                                            background: problem.difficulty === 'Easy' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                            color: problem.difficulty === 'Easy' ? '#10b981' : '#f59e0b',
                                            marginTop: '4px',
                                            display: 'inline-block'
                                        }}>
                                            {problem.difficulty}
                                        </span>
                                    </div>
                                </div>
                                <a
                                    href={problem.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn"
                                    style={{ padding: '8px 15px', fontSize: '0.9rem', background: 'var(--surface)', color: 'white' }}
                                >
                                    Solve <ExternalLink size={14} style={{ marginLeft: '5px' }} />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DSAPage;
