
export const getMyRoutines = () => {
    const dummyData = [
        {
            id: 0,
            name: "Back Routine",
            description: "Routine for hypertrophy in the back",
            time: 60,
            exercises_number: 4
        },
        {
            id: 1,
            name: "Leg Workout",
            description: "Intense leg workout for strength",
            time: 45,
            exercises_number: 5
        },
        {
            id: 2,
            name: "Core Exercises",
            description: "Core strengthening exercises",
            time: 30,
            exercises_number: 3
        },
        {
            id: 3,
            name: "Chest Workout",
            description: "Chest routine for muscle definition",
            time: 55,
            exercises_number: 6
        }
    ]


    return dummyData;
}