import { useEffect, useState } from "react"
import RoutineTableShow from "../../components/dashboard/RoutineTable/RoutineTableShow"
import { delete_routine, get_exercises, get_routine } from "../../actions/api/routines"
import { useParams } from 'react-router-dom'
import LoadingAlert from "../../components/alerts/LoadingAlert"
import FailedAlert from "../../components/alerts/FailedAlert"
import RoutineTableEdit from "../../components/dashboard/RoutineTable/RoutineTableEdit"

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
    const [exercisesAvailable, setExercisesAvailable] = useState<Array<any>>([])
    const [routineInfo, setRoutineInfo] = useState<any>({
        name: '',
        description: ''
    })
    const [editedRoutineInfo, setEditedRoutineInfo] = useState<any>({
        name: '',
        description: ''
    })
    const [editedExercises, setEditedExercises] = useState<Array<any>>([])

    const [editMode, setEditMode] = useState<boolean>(true)
    const [newExercise, setNewExercise] = useState<any>({
        exercise: -1,
        series: 1,
        repetitions: 1,
        rest: 1
    })

    const [alert, setAlert] = useState({ show: false, message: '', status: '' })

    useEffect(() => {
        const getExercises = async () => {
            const { data, error } = await get_routine(routine)
            if (!error) {
                setExercises(data['exercise'])
                setEditedExercises([...data['exercise']])
                setRoutineInfo({
                    name: data['name'],
                    description: data['description']
                })
                setEditedRoutineInfo({
                    name: data['name'],
                    description: data['description']
                })
            }
            setAlert({ show: error, message: 'Routine Load Failed', status: 'error' })
        }

        const get_exercises_available = async () => {
            const { data, error } = await get_exercises()
            if (!error) {
                setExercisesAvailable(data)
            }
        }
        get_exercises_available()
        setAlert({ show: true, message: 'Loading...', status: 'loading' })
        getExercises()

    }, [])

    const handleDelete = async () => {
        console.log('delete ' + routine)
        setAlert({ show: true, message: 'Deleting...', status: 'loading' })
        const { error } = await delete_routine(routine)
        if (!error) {
            setAlert({ show: true, message: 'Routine Deleted', status: 'success' })
        }
        else {
            setAlert({ show: true, message: 'Routine Delete Failed', status: 'error' })
        }
    }

    const handleEdit = () => {
        setEditMode(true)
    }


    const cancelEditRoutine = () => {
        setEditedRoutineInfo(routineInfo)
        setEditedExercises(exercises)
        setEditMode(false)
    }

    const acceptEditRoutine = () => {
        const editedOrNewExercises = editedExercises.map((exer: any) => {
            if (exer.id) {
                return {
                    id: exer.id,
                    series: exer.series,
                    repetitions: exer.repetitions,
                    rest: exer.rest
                }
            }
            else {
                return {
                    exercise: exer.exercise.id,
                    series: exer.series,
                    repetitions: exer.repetitions,
                    rest: exer.rest
                }
            }
        })
        const editedRoutine = { ...editedRoutineInfo, exercises: editedOrNewExercises }
        console.log("Routine", routine, editedRoutine)
    }

    const deleteExercise = (index: number, id: number) => {
        if (id) {
            console.log('delete ' + id)
        }
        else {
            const updatedExercises = [...editedExercises].filter((_, i) => i != index);
            setEditedExercises(updatedExercises);
        }
    }

    const onChangeEditedRoutineInfo = (e: any) => setEditedRoutineInfo({ ...routineInfo, [e.target.name]: e.target.value });

    const onChangeNewExercise = (e: any) => {
        setNewExercise({ ...newExercise, [e.target.name]: e.target.value })
    };

    const addNewExercise = () => {
        if (newExercise.exercise != -1) {
            console.log(newExercise)
            const newExerciseToAdd = {
                exercise: exercisesAvailable.filter((e: any) => e['id'] == newExercise.exercise)[0],
                series: newExercise.series,
                repetitions: newExercise.repetitions,
                rest: newExercise.rest
            }
            setEditedExercises([...editedExercises, newExerciseToAdd])
            setNewExercise({
                exercise: -1,
                series: 1,
                repetitions: 1,
                rest: 1
            })
        }
        console.log(newExercise)
    }

    const onChangeEditedExercises = (
        index: number,
        field: string,
        value: number | string
    ) => {
        const newExercises = JSON.parse(JSON.stringify(editedExercises));;
        newExercises[index][field] = value;
        setEditedExercises(newExercises);
    };

    return (
        <>
            {alert.show &&
                <div className="bg-gray-300 rounded-lg p-4 min-h-screen flex items-center justify-center">
                    {alert.show && alert.status == 'loading' && <LoadingAlert />}
                    {alert.show && alert.status == 'error' && <FailedAlert message={alert.message} />}
                    {alert.show && alert.status == 'success' && <div className="bg-green-500 text-white font-bold rounded-lg border shadow-lg p-4">{alert.message}</div>}
                </div>
            }
            {!alert.show &&
                <div className="bg-gray-300 rounded-lg p-4 min-h-screen">
                    <div className="flex justify-center">
                        {editMode ?
                            <input type="text" className="text-4xl font-bold" value={editedRoutineInfo.name} name="name" onChange={e => onChangeEditedRoutineInfo(e)}/>
                            :
                            <h1 className="text-4xl font-bold">{routineInfo.name}</h1>
                        }
                    </div>
                    <div className="flex justify-center mb-2 mt-2 w-full">
                        {editMode ?
                            <textarea className="text-xl w-full" value={editedRoutineInfo.description} name="description" onChange={e => onChangeEditedRoutineInfo(e)} />
                            :
                            <p className="text-xl">{routineInfo.description}</p>
                        }
                    </div>
                    {editMode ?
                        <RoutineTableEdit editedExercises={editedExercises} deleteExercise={deleteExercise} onChangeEditedExercises={onChangeEditedExercises} onChangeNewExercise={onChangeNewExercise} addNewExercise={addNewExercise} newExercise={newExercise} exercisesAvailable={exercisesAvailable} />
                        :
                        <RoutineTableShow exercises={exercises} />
                    }

                    {editMode ?
                        <div className="flex justify-between mt-4">
                            <button onClick={cancelEditRoutine} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                            <button onClick={acceptEditRoutine} className="bg-green-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Accept</button>
                        </div>
                        :
                        <div className="flex justify-between mt-4">
                            <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete Routine</button>
                            <button onClick={handleEdit} className="bg-green-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Edit Routine</button>
                        </div>
                    }


                </div>
            }
        </>
    )
}

export default Dashboard_routine