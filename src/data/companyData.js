export const companies = [
    {
        id: 'tcs',
        name: 'TCS (NQT)',
        description: 'Tata Consultancy Services National Qualifier Test for freshers.',
        rounds: [
            { title: 'Online Assessment', details: 'Aptitude, Reasoning, Verbal, and Programming Logic.' },
            { title: 'Technical Interview', details: 'CS Fundamentals, Projects, and Coding.' },
            { title: 'HR Interview', details: 'Behavioral and communication skills.' }
        ],
        pattern: {
            aptitude: 'Numerical Ability (26Q), Verbal Ability (24Q), Reasoning Ability (30Q)',
            coding: '2 Problems (Hands-on coding)'
        },
        eligibility: '60% throughout in 10th, 12th, and Degree. No active backlogs.'
    },
    {
        id: 'amazon',
        name: 'Amazon',
        description: 'SDE roles focusing on Leadership Principles and problem solving.',
        rounds: [
            { title: 'OA (Online Assessment)', details: 'SDE Simulation, Coding, and Work Style Assessment.' },
            { title: 'Technical Phone Screen', details: 'DSA and basic system design.' },
            { title: 'Onsite Loop', details: '4-5 rounds of DSA + Leadership Principles (LP).' }
        ],
        pattern: {
            oa: '2 Coding questions (70-90 mins) + Behavioral questions.',
            onsite: 'Bar Raiser round is crucial.'
        },
        eligibility: 'Bachelor\'s/Master\'s in CS or related field.'
    }
];
