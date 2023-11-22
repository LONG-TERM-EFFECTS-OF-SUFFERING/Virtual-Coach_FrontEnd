import { useEffect, useState } from "react"
import RoutineTableShow from "../../components/dashboard/RoutineTable/RoutineTableShow"
import { get_routine } from "../../actions/api/routines"
import { useParams } from 'react-router-dom'
import LoadingAlert from "../../components/alerts/LoadingAlert"
import FailedAlert from "../../components/alerts/FailedAlert"

type Exercise = {
    id: number,
    exercise: {
        id: number,
        name: string,
        img_url: string
    },
    series: number,
    repetitions: number,
    rest: number
}


const Dashboard_routine = () => {
    const { routine } = useParams<{ routine: string }>()
    const [exercises, setExercises] = useState<Array<Exercise>>([])
    const [routineInfo, setRoutineInfo] = useState<any>({
        name: '',
        description: ''
    })

    const [alert, setAlert] = useState({ show: false, message: '', status: '' })

    useEffect(() => {
        const get_exercises = async () => {
            const { data, error } = await get_routine(routine)
            if (!error) {
                setExercises(data['exercise'])
                setRoutineInfo({
                    name: data['name'],
                    description: data['description']
                })
            }
            setAlert({ show: error, message: 'Routine Load Failed', status: 'error' })
        }
        setAlert({ show: true, message: 'Loading...', status: 'loading' })
        get_exercises()

    }, [])

    const handleDelete = () => {
        console.log('delete ' + routine)
    }

    const handleEdit = () => {
        console.log('edit ' + routine)
    }

    return (
        <>
            {alert.show &&
                <div className="bg-gray-300 rounded-lg p-4 min-h-screen flex items-center justify-center">
                    {alert.show && alert.status == 'loading' && <LoadingAlert />}
                    {alert.show && alert.status == 'error' && <FailedAlert message={alert.message} />}
                </div>
            }
            {!alert.show &&
                <div className="bg-gray-300 rounded-lg p-4 min-h-screen">
                    <div className="flex justify-center">
                        <h1 className="text-4xl font-bold">{routineInfo.name}</h1>
                    </div>
                    <div className="flex justify-center mb-2">
                        <p className="text-xl">{routineInfo.description}</p>
                    </div>
                    <RoutineTableShow exercises={exercises} />
                    <div className="flex justify-between mt-4">
                        <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete Routine</button>
                        <button onClick={handleEdit} className="bg-green-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Edit Routine</button>
                    </div>

                </div>
            }
        </>
    )
}

export default Dashboard_routine