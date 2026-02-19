import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const loginWithGithub = async () => {
        setLoading(true);
        try {
            // Calling the local backend API
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: 'shraddha@example.com', password: 'testpassword' })
            });
            const data = await response.json();

            if (data.success) {
                const mockUserWithDetails = {
                    ...data.user,
                    username: 'ShraddhaRajawat',
                    linkedin: 'https://www.linkedin.com/in/shraddha-rajawat-26060428a/',
                    phone: '6306353376'
                };
                localStorage.setItem('user', JSON.stringify(mockUserWithDetails));
                setUser(mockUserWithDetails);
            }
        } catch (error) {
            console.error('Backend connection failed:', error);
            alert('Backend is not running. Please start the server.');
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loginWithGithub, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
