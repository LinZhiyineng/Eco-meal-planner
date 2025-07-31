
export enum CarbonImpact {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High'
}

export type Meal = {
    name: string;
    type: 'Breakfast' | 'Lunch' | 'Dinner';
    ingredients: string[];
    instructions: string[];
    carbonImpact: CarbonImpact;
}

export type DailyPlan = {
    day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
    meals: Meal[];
}

export type MealPlanResponse = {
    weeklyPlan: DailyPlan[];
    sustainabilityTips: string[];
}

export enum DietaryPreference {
    Vegetarian = 'Vegetarian',
    LowGI = 'Low-GI',
    HighProtein = 'High-Protein',
    Vegan = 'Vegan',
    Balanced = 'Balanced'
}
