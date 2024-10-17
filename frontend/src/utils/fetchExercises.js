// src/utils/fetchExercises.js
const fetchExercises = async (muscleId) => {
    try {
        const response = await fetch(
            `https://wger.de/api/v2/exercise/?muscles=${muscleId}&language=2`
        );
        const data = await response.json();
        return data.results; // Return the array of exercises
    } catch (error) {
        console.error("Error fetching exercises:", error);
        return []; // Return an empty array on error
    }
};

export default fetchExercises;
