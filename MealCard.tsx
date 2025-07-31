
import React, { useState } from 'react';
import { Meal, CarbonImpact } from '../types';
import Icon from './Icon';

interface MealCardProps {
    meal: Meal;
}

const CarbonImpactBadge: React.FC<{ impact: CarbonImpact }> = ({ impact }) => {
    const colorClasses = {
        [CarbonImpact.Low]: 'bg-green-100 text-green-800',
        [CarbonImpact.Medium]: 'bg-yellow-100 text-yellow-800',
        [CarbonImpact.High]: 'bg-red-100 text-red-800',
    };
    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${colorClasses[impact]}`}>
            {impact} Carbon Impact
        </span>
    );
};

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200/80">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-4 text-left flex justify-between items-center focus:outline-none"
            >
                <div>
                    <p className="text-sm font-semibold text-emerald-600">{meal.type}</p>
                    <h3 className="text-lg font-bold text-gray-800">{meal.name}</h3>
                </div>
                <div className="flex items-center space-x-4">
                    <CarbonImpactBadge impact={meal.carbonImpact} />
                    <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} className="w-5 h-5 text-gray-500 transition-transform duration-200" />
                </div>
            </button>
            
            {isOpen && (
                <div className="px-4 pb-4 bg-gray-50/50">
                    <div className="mt-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Ingredients</h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                            {meal.ingredients.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Instructions</h4>
                        <ol className="list-decimal list-inside text-gray-600 space-y-1">
                             {meal.instructions.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MealCard;
