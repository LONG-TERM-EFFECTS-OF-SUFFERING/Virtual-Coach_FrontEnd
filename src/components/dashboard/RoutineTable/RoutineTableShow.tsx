import React from "react"

type Exercise = {
    id: number,
    name: string,
    img_url: string
}

type RoutineTableProps = {
    exercises: Array<{
        id: number,
        exercise: Exercise,
        series: number,
        repetitions: number,
        rest: number
    }>
}

const RoutineTableShow: React.FC<RoutineTableProps> = ({ exercises }) => {

    const columns = ['Exercise', 'Sets', 'Reps', 'Rest (minutes)']
    const rows = exercises

    return (
        <div className="relative overflow-x-auto rounded">
            <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                    <tr>
                        {columns.map((column, key) =>
                        (<th scope="col" className="px-6 py-3" key={key}>
                            {column}
                        </th>))
                        }
                    </tr>
                </thead>
                <tbody>
                    {rows.map((exer, key) => {
                        const { exercise, series, repetitions, rest } = exer
                        return (
                            <tr className="border-b bg-gray-800 border-gray-700 rounded" key={key}>
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                    {exercise['name']}
                                </th>
                                <td className="px-6 py-4">
                                    {series}
                                </td>
                                <td className="px-6 py-4">
                                    {repetitions}
                                </td>
                                <td className="px-6 py-4">
                                    {rest}
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
            {rows.length === 0 && 
                <div className="bg-gray-800 p-8">
                    <p className="text-center text-white">No exercises added</p>
                </div>
                
            }
        </div>
    )
}

export default RoutineTableShow