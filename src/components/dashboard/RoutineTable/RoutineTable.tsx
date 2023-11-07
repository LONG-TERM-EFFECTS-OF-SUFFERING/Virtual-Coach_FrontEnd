import React from "react"

type RoutineTableProps = {
    exercises: Array<{
        name: string,
        sets: number,
        reps: number,
        rest: number
    }>;
    onDelete: (e:any,index: number) => void;
}

const RoutineTable: React.FC<RoutineTableProps> = ({ exercises, onDelete }) => {

    const columns = ['Exercise', 'Sets', 'Reps', 'Rest']
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
                        const { name, sets, reps, rest } = exer
                        return (
                            <tr className="border-b bg-gray-800 border-gray-700 rounded" key={key}>
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                    {name}
                                </th>
                                <td className="px-6 py-4">
                                    {sets}
                                </td>
                                <td className="px-6 py-4">
                                    {reps}
                                </td>
                                <td className="px-6 py-4">
                                    {rest}
                                </td>
                                <td className="px-1 py-4 bg-red-600 hover:bg-red-300">
                                    <div className="">
                                        <button
                                            onClick={(e) => onDelete(e,key)} // Call onDelete prop
                                            className="text-white"
                                        >
                                            X
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default RoutineTable