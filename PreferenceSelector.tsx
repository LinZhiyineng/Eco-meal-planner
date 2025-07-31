
import React from 'react';
import { DIETARY_OPTIONS } from '../constants';
import { DietaryPreference } from '../types';
import Icon from './Icon';

interface PreferenceSelectorProps {
    onSelect: (preference: DietaryPreference) => void;
}

const PreferenceSelector: React.FC<PreferenceSelectorProps> = ({ onSelect }) => {
    return (
        <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Your Green Kitchen</h2>
            <p className="text-gray-600 mb-8">Start by choosing your dietary preference. We'll craft a delicious, eco-friendly meal plan just for you.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DIETARY_OPTIONS.map((option) => (
                    <button
                        key={option}
                        onClick={() => onSelect(option)}
                        className="w-full text-lg font-semibold text-emerald-700 bg-white border-2 border-emerald-200 rounded-lg p-4 transition-all duration-200 ease-in-out hover:bg-emerald-50 hover:border-emerald-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    >
                        {option}
                    </button>
                ))}
            </div>
            <p className="text-sm text-gray-500 mt-8 flex items-center justify-center space-x-2">
                <Icon name="leaf" className="w-4 h-4 text-emerald-500" />
                <span>Powered by sustainable AI</span>
            </p>
        </div>
    );
};

export default PreferenceSelector;
