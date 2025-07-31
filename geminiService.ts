
import { GoogleGenAI, Type } from "@google/genai";
import { DietaryPreference, MealPlanResponse } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        weeklyPlan: {
            type: Type.ARRAY,
            description: "A 7-day meal plan, with one entry per day.",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { 
                        type: Type.STRING, 
                        description: "Day of the week." 
                    },
                    meals: {
                        type: Type.ARRAY,
                        description: "Three meals for the day: Breakfast, Lunch, and Dinner.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: { 
                                    type: Type.STRING,
                                    description: "Name of the dish." 
                                },
                                type: { 
                                    type: Type.STRING,
                                    description: "Type of meal: Breakfast, Lunch, or Dinner." 
                                },
                                ingredients: {
                                    type: Type.ARRAY,
                                    description: "A list of simple ingredients.",
                                    items: { type: Type.STRING }
                                },
                                instructions: {
                                    type: Type.ARRAY,
                                    description: "A list of quick preparation steps.",
                                    items: { type: Type.STRING }
                                },
                                carbonImpact: { 
                                    type: Type.STRING,
                                    description: "Estimated carbon impact: Low, Medium, or High." 
                                }
                            },
                             required: ["name", "type", "ingredients", "instructions", "carbonImpact"]
                        }
                    }
                },
                required: ["day", "meals"]
            }
        },
        sustainabilityTips: {
            type: Type.ARRAY,
            description: "A list of 5 practical sustainability tips related to cooking, food storage, or reducing waste.",
            items: { type: Type.STRING }
        }
    },
    required: ["weeklyPlan", "sustainabilityTips"]
};

export const generateMealPlan = async (preference: DietaryPreference): Promise<MealPlanResponse> => {
    try {
        const prompt = `Generate a 7-day, low-carbon-footprint meal plan for a person with a ${preference} diet. The plan must use seasonal and local ingredients readily available in Singapore. For each day from Monday to Sunday, provide three meals: Breakfast, Lunch, and Dinner. Also, provide 5 practical sustainability tips related to cooking and food consumption.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.7,
            },
        });
        
        const jsonText = response.text.trim();
        const data = JSON.parse(jsonText);

        // Simple validation to ensure data structure is as expected.
        if (!data.weeklyPlan || !data.sustainabilityTips) {
             throw new Error("Invalid data structure received from API.");
        }

        return data as MealPlanResponse;

    } catch (error) {
        console.error("Error generating meal plan:", error);
        throw new Error("Failed to generate a meal plan. Please check your API key and try again.");
    }
};
