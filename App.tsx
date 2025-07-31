
import React, { useState, useCallback } from 'react';
import { DietaryPreference, MealPlanResponse } from './types';
import { generateMealPlan } from './services/geminiService';
import Header from './components/Header';
import PreferenceSelector from './components/PreferenceSelector';
import LoadingSpinner from './components/LoadingSpinner';
import MealPlanDisplay from './components/MealPlanDisplay';

type AppStep = 'preferences' | 'loading' | 'plan' | 'error';

const App: React.FC = () => {
    const [step, setStep] = useState<AppStep>('preferences');
    const [mealPlan, setMealPlan] = useState<MealPlanResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handlePreferenceSelect = useCallback(async (preference: DietaryPreference) => {
        setStep('loading');
        setError(null);
        try {
            const plan = await generateMealPlan(preference);
            setMealPlan(plan);
            setStep('plan');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(errorMessage);
            setStep('error');
        }
    }, []);

    const handleReset = () => {
        setStep('preferences');
        setMealPlan(null);
        setError(null);
    };

    const renderContent = () => {
        switch (step) {
            case 'preferences':
                return <PreferenceSelector onSelect={handlePreferenceSelect} />;
            case 'loading':
                return <LoadingSpinner />;
            case 'plan':
                return mealPlan ? (
                    <MealPlanDisplay plan={mealPlan.weeklyPlan} tips={mealPlan.sustainabilityTips} onReset={handleReset} />
                ) : null;
            case 'error':
                 return (
                    <div className="p-6 text-center text-red-600 bg-red-50 rounded-lg">
                        <h2 className="text-xl font-bold mb-2">Oops! Something went wrong.</h2>
                        <p>{error}</p>
                        <button
                            onClick={handleReset}
                            className="mt-4 bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <Header />
            <main className="max-w-md mx-auto">
                <div className="p-4">
                  {renderContent()}
                </div>
            </main>
            <footer className="text-center p-4 text-xs text-gray-400">
                <p>&copy; {new Date().getFullYear()} EcoSavor Collective. Eat Green, Live Well.</p>
            </footer>
        </div>
    );
};

export default App;
