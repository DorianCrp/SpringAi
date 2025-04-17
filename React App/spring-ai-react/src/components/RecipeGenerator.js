import React, { useState } from "react";

function RecipeGenerator() {
    const [ingredients, setIngredients] = useState('');
    const [cuisine, setCuisine] = useState('any');
    const [dietaryRestrictions, setDietaryRestrictions] = useState('');
    const [recipe, setRecipe] = useState('');
    const [loading, setLoading] = useState(false);

    const createRecipe = async () => {
        if (!ingredients.trim()) {
            setRecipe("Please enter at least one ingredient!");
            return;
        }

        setLoading(true);
        setRecipe('');

        try {
            const url = `https://springai-backend-baeua7h7buh4bwdt.francecentral-01.azurewebsites.net/recipe-creator?ingredients=${encodeURIComponent(ingredients)}&dietaryRestrictions=${encodeURIComponent(dietaryRestrictions)}&cuisine=${encodeURIComponent(cuisine)}`;
            const response = await fetch(url);
            const data = await response.text();
            setRecipe(data);
        } catch (error) {
            console.error("Error generating recipe:", error);
            setRecipe("Error generating the recipe.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
            <h2>🍽️ Recipe Generator</h2>

            <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Ingredients (comma separated)"
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />

            <input
                type="text"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                placeholder="Cuisine type (e.g. Italian, Asian...)"
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />

            <input
                type="text"
                value={dietaryRestrictions}
                onChange={(e) => setDietaryRestrictions(e.target.value)}
                placeholder="Dietary restrictions (optional)"
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />

            <button onClick={createRecipe} disabled={loading} style={{ padding: "10px 20px" }}>
                {loading ? "Creating..." : "Create Recipe"}
            </button>

            {recipe && (
                <div style={{ marginTop: "20px", backgroundColor: "#f9f9f9", padding: "15px", borderRadius: "6px", whiteSpace: "pre-wrap" }}>
                    <h3>🍴 Generated Recipe:</h3>
                    <p>{recipe}</p>
                </div>
            )}
        </div>
    );
}

export default RecipeGenerator;
