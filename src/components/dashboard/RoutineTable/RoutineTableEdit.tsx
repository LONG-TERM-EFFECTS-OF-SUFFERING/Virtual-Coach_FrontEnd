
type Exercise = {
    id: number;
    name: string;
    img_url: string;
};

type RoutineTableProps = {
    editedExercises: Array<{
        id: number;
        exercise: Exercise;
        series: number;
        repetitions: number;
        rest: number;
    }>;
    deleteExercise: (index: number, id: number) => void;
    onChangeEditedExercises: (index: number, field: string, value: number) => void;
    onChangeNewExercise: (e:any) => void;
    addNewExercise: () => void;
    newExercise: any;
    exercisesAvailable: Array<any>;
};

const RoutineTableEdit: React.FC<RoutineTableProps> = ({ editedExercises, deleteExercise, onChangeEditedExercises, onChangeNewExercise, addNewExercise, newExercise, exercisesAvailable }) => {
    const columns = ["Exercise", "Sets", "Reps", "Rest (minutes)"];

    return (
        <div className="relative overflow-x-auto rounded">
            <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                    <tr>
                        {columns.map((column, key) => (
                            <th scope="col" className="px-6 py-3" key={key}>
                                {column}
                            </th>
                        ))}
                        <th scope="col" className="px-6 py-3">

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {editedExercises.map((exer, key) => {
                        const { id, exercise, series, repetitions, rest } = exer;
                        return (
                            <tr className="border-b bg-gray-800 border-gray-700 rounded" key={key}>
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                    {exercise["name"]}
                                </th>
                                <td className="px-6 py-4">
                                    <input
                                        type="number"
                                        value={series}
                                        onChange={(e) => onChangeEditedExercises(key, "series", +e.target.value)}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <input
                                        type="number"
                                        value={repetitions}
                                        onChange={(e) => onChangeEditedExercises(key, "repetitions", +e.target.value)}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <input
                                        type="number"
                                        value={rest}
                                        onChange={(e) => onChangeEditedExercises(key, "rest", +e.target.value)}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => deleteExercise(key, id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    {/* New row for adding a new exercise */}
                    <tr className="border-b bg-gray-800 border-gray-700 rounded">
                        <td className="px-6 py-4">
                            {/* Select field for Exercise Name */}
                            <select
                                value={newExercise.exercise}
                                name="exercise"
                                onChange={(e) => onChangeNewExercise(e)}
                            >
                                <option value="" disabled>Select Exercise</option>
                                {exercisesAvailable.map((exer, index) => (
                                    <option key={index} value={exer.id}>{exer.name}</option>
                                ))}
                            </select>
                        </td>
                        <td className="px-6 py-4">
                            {/* Input field for Sets */}
                            <input
                                type="number"
                                placeholder="Sets"
                                value={newExercise.series}
                                name="series"
                                onChange={(e) => onChangeNewExercise(e)}
                            />
                        </td>
                        <td className="px-6 py-4">
                            {/* Input field for Repetitions */}
                            <input
                                type="number"
                                placeholder="Repetitions"
                                value={newExercise.repetitions}
                                name="repetitions"
                                onChange={(e) => onChangeNewExercise(e)}
                            />
                        </td>
                        <td className="px-6 py-4">
                            {/* Input field for Rest */}
                            <input
                                type="number"
                                placeholder="Rest (minutes)"
                                value={newExercise.rest}
                                name="rest"
                                onChange={(e) => onChangeNewExercise(e)}
                            />
                        </td>
                        <td className="px-6 py-4">
                            {/* Button to add the new exercise */}
                            <button className="text-green-500 hover:text-green-700" onClick={addNewExercise}>
                                Add
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            {editedExercises.length === 0 && (
                <div className="bg-gray-800 p-8">
                    <p className="text-center text-white">No exercises added</p>
                </div>
            )}
        </div>
    );
};

export default RoutineTableEdit;
