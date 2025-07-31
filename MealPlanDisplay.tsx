
import React, { useState, useMemo } from 'react';
import { DailyPlan } from '../types';
import MealCard from './MealCard';
import Icon from './Icon';
import { DAYS_OF_WEEK } from '../constants';

interface MealPlanDisplayProps {
    plan: DailyPlan[];
    tips: string[];
    onReset: () => void;
}

const MealPlanDisplay: React.FC<MealPlanDisplayProps> = ({ plan, tips, onReset }) => {
    const today = new Date().toLocaleString('en-US', { weekday: 'long' }) as any;
    const [selectedDay, setSelectedDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'>(DAYS_OF_WEEK.includes(today) ? today : 'Monday');

    const planByDay = useMemo(() => {
        return plan.reduce((acc, current) => {
            acc[current.day] = current;
            return acc;
        }, {} as Record<string, DailyPlan>);
    }, [plan]);

    const dailyPlan = planByDay[selectedDay];

    return (
        <div className="p-4 space-y-6">
            <div>
                <div className="overflow-x-auto pb-2 -mx-4 px-4">
                    <div className="flex space-x-2">
                        {DAYS_OF_WEEK.map(day => (
                            <button
                                key={day}
                                onClick={() => setSelectedDay(day)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 whitespace-nowrap ${
                                    selectedDay === day 
                                    ? 'bg-emerald-600 text-white shadow-md' 
                                    : 'bg-white text-emerald-700 hover:bg-emerald-50'
                                }`}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {dailyPlan ? (
                <div className="space-y-4">
                    {dailyPlan.meals.map((meal, index) => (
                        <MealCard key={index} meal={meal} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10">
                    <p className="text-gray-500">No meal plan available for {selectedDay}.</p>
                </div>
            )}

            <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-r-lg p-4 space-y-3">
                <div className="flex items-center space-x-2">
                    <Icon name="tip" className="w-6 h-6 text-emerald-600" />
                    <h3 className="text-lg font-bold text-emerald-800">Sustainability Tips</h3>
                </div>
                <ul className="list-disc list-inside text-emerald-700 space-y-1">
                    {tips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                    ))}
                </ul>
            </div>
            
            <div className="text-center pt-4">
                <button
                    onClick={onReset}
                    className="bg-gray-200 text-gray-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                >
                    Start Over
                </button>
            </div>
        </div>
    );
};

export default MealPlanDisplay;
