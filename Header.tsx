
import React from 'react';
import Icon from './Icon';

const Header: React.FC = () => {
    return (
        <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 w-full shadow-sm">
            <div className="max-w-md mx-auto p-4 flex items-center justify-center space-x-3">
                <Icon name="leaf" className="w-8 h-8 text-emerald-500" />
                <h1 className="text-2xl font-bold text-emerald-800">EcoSavor Collective</h1>
            </div>
        </header>
    );
};

export default Header;
