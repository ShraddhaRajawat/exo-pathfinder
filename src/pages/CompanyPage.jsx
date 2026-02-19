import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Info, ListOrdered, CheckCircle, InfoIcon, ShieldCheck } from 'lucide-react';
import { companies } from '../data/companyData';

const CompanyPage = () => {
    const [selectedCompany, setSelectedCompany] = useState(companies[0]);

    return (
        <div className="main-container" style={{ padding: '40px 20px' }}>
            <header style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
                    Company <span className="gradient-text">Hiring Guides</span>
                </h1>
                <p style={{ color: 'var(--text-muted)' }}>Deep dive into the recruitment processes of world-class companies.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '30px' }}>
                {/* Company List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {companies.map(company => (
                        <div
                            key={company.id}
                            onClick={() => setSelectedCompany(company)}
                            className="glass-card"
                            style={{
                                padding: '20px',
                                cursor: 'pointer',
                                border: selectedCompany.id === company.id ? '1px solid var(--primary)' : '1px solid var(--glass-border)',
                                background: selectedCompany.id === company.id ? 'rgba(99, 102, 241, 0.1)' : 'var(--glass)'
                            }}
                        >
                            <h3 style={{ margin: 0 }}>{company.name}</h3>
                        </div>
                    ))}
                </div>

                {/* Details Section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="glass-card" style={{ padding: '30px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                            <div style={{ background: 'var(--primary)', padding: '10px', borderRadius: '12px' }}>
                                <Building2 color="white" size={30} />
                            </div>
                            <div>
                                <h2 style={{ fontSize: '2rem' }}>{selectedCompany.name}</h2>
                                <p style={{ color: 'var(--text-muted)' }}>{selectedCompany.description}</p>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '30px' }}>
                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '15px', border: '1px solid var(--glass-border)' }}>
                                <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px', color: 'var(--secondary)' }}>
                                    <ShieldCheck size={18} /> Eligibility Criteria
                                </h4>
                                <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>{selectedCompany.eligibility}</p>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '15px', border: '1px solid var(--glass-border)' }}>
                                <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px', color: 'var(--accent)' }}>
                                    <InfoIcon size={18} /> Exam Pattern
                                </h4>
                                <div style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                                    {Object.entries(selectedCompany.pattern).map(([key, value]) => (
                                        <div key={key} style={{ marginBottom: '8px' }}>
                                            <strong style={{ textTransform: 'capitalize' }}>{key}:</strong> {value}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: '30px' }}>
                        <h3 style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <ListOrdered size={24} color="var(--primary)" /> Hiring Rounds
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {selectedCompany.rounds.map((round, index) => (
                                <div key={index} style={{ display: 'flex', gap: '20px' }}>
                                    <div style={{
                                        minWidth: '35px',
                                        height: '35px',
                                        borderRadius: '50%',
                                        background: 'var(--surface)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'bold',
                                        color: 'var(--primary)',
                                        border: '1px solid var(--primary)'
                                    }}>
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h4 style={{ marginBottom: '5px' }}>{round.title}</h4>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{round.details}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyPage;
