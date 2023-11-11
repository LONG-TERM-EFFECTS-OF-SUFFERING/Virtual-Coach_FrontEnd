import { useEffect, useState } from "react"
import RoutineTableShow from "../../components/dashboard/RoutineTable/RoutineTableShow"
import { get_routine } from "../../actions/api/routines"
import { useParams } from 'react-router-dom'

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
    useEffect(() => {
        const get_exercises = async () => {
            const { data, error } = await get_routine(routine)
            if (!error) {
                setExercises(data)
            }
        }
        get_exercises()
    }, [])

    /*
    const exercises: any = [
        {
            "id": 1,
            "repetitions": 10,
            "series": 10,
            "rest": 10,
            "exercise": {
                "id": 5,
                "name": "Squats",
                "img_url": "https://www.freepik.es/foto-gratis/ejercicio-concepto-bienestar-mujeres-mujer-joven-forma-fisica-haciendo-sentadillas-ejercicio-casa-gimnasio_83330295.htm#query=squats&position=5&from_view=search&track=sph"
            }
        }
    ]*/

    return (
        <div className="bg-gray-300 rounded-lg p-4 min-h-screen">
            <RoutineTableShow exercises={exercises} />
        </div>
    )
}

export default Dashboard_routine