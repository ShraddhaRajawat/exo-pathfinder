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

    const loginWithGithub = () => {
        // Simulated GitHub Login
        setLoading(true);
        setTimeout(() => {
            const mockUser = {
                name: 'Shraddha Rajawat',
                username: 'ShraddhaRajawat',
                avatar: 'https://github.com/ShraddhaRajawat.png',
                email: 'shraddha@example.com'
            };
            localStorage.setItem('user', JSON.stringify(mockUser));
            setUser(mockUser);
            setLoading(false);
        }, 1500);
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
