import { useEffect, useState } from "react"
import RoutineTable from "../../components/dashboard/RoutineTable/RoutineTable"
import { useAppSelector } from "../../store/hooks/hooks";
import { create_user_routine, get_exercises } from "../../actions/api/routines";

const Dashboard_create_routine = () => {

    const user_id = useAppSelector((state) => state.user && state.user.id ? state.user.id : null);

    const [exercises, setExercises] = useState<Array<{ exercise: number; series: number; repetitions: number; rest: number }>>([])
    const [exerciseSelected, setExercise] = useState({
        exercise: -1,
        series: 1,
        repetitions: 1,
        rest: 1

    })
    const [exercisesShow, setExercisesShow] = useState<Array<{ name: string; sets: number; reps: number; rest: number }>>([])
    const [routineInfo, setRoutineInfo] = useState({
        name_r: "",
        description: "",
    })

    const [exercisesAvailable, setExercisesAvailable] = useState<Array<{ id: number; name: string; img_url:string }>>([])
    useEffect(() => {
        const getExercises = async () => {
            const { data, error } = await get_exercises()
            if (!error) {
                setExercisesAvailable(data)
            }
        }
        getExercises()
    }, [])

    const { name_r, description } = routineInfo

    const onChangeExercise = (e: any) => {
        setExercise({ ...exerciseSelected, [e.target.name]: e.target.value })
    };

    const onChangeRoutineInfo = (e: any) => setRoutineInfo({ ...routineInfo, [e.target.name]: e.target.value });

    const { exercise, series, repetitions, rest } = exerciseSelected

    const addExercise = (e: any) => {
        e.preventDefault()
        if (exercise != -1) {
            setExercises([...exercises, exerciseSelected])
            setExercisesShow([...exercisesShow, { name: exercisesAvailable.filter((e) => e['id']==exercise)[0]['name'], sets: series, reps: repetitions, rest: rest }])
            setExercise({
                exercise: -1,
                series: 1,
                repetitions: 1,
                rest: 1
            })
        }
    }

    const deleteExercise = (e:any,index: number) => {
        e.preventDefault()
        const updatedExercises = [...exercises].filter((_, i) => i != index);
        const updatedExercisesShow = [...exercisesShow].filter((_, i) => i != index);
        setExercisesShow(updatedExercisesShow);
        setExercises(updatedExercises);
    };

    const createRoutine = async (e: any) => {
        e.preventDefault()
        const routine = {
            name: name_r,
            description,
            time: exercises.reduce((acc, curr) => acc + curr.rest, 0),
            exercises_number: exercises.length,
            exercises: exercises
        }
        const user = user_id
           
        const { data, error } = await create_user_routine(user, routine)
        if (!error) {
            console.log(data)
        }
        else {
            console.log(data)
        }
    }

    return (
        <div className="bg-gray-800 rounded-lg p-4 min-h-screen flex items-center justify-center">
            <form className="bg-white shadow-md flex flex-col items-center rounded-xl px-8 pt-10 pb-8 mb-1">
                <div className="mb-4 font-bold">
                    Create Your Routine
                </div>
                <div>

                </div>
                <div className="relative">
                    <input type="text" className="bg-gray-100 border w-full outline-none px-4 pl-7 rounded-lg py-1" placeholder="name" name="name_r" value={name_r} onChange={(e) => onChangeRoutineInfo(e)} />
                </div>
                <div className="relative mt-5">
                    <textarea className="bg-gray-100 border w-full outline-none px-4 pl-7 rounded-lg py-1" placeholder="description" name="description" value={description} onChange={(e) => onChangeRoutineInfo(e)} />
                </div>

                <div>
                    <h1 className="font-bold mt-5">Chose your exercises</h1>
                    <div className="relative mt-4">
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2" defaultValue={-1} name="exercise" placeholder="Exercise" onChange={(e) => onChangeExercise(e)}>
                            <option value={-1}>Exercise</option>
                            {exercisesAvailable.map((exercise, index) => {
                                return (
                                    <option key={index} value={exercise['id']}>{exercise['name']}</option>
                                )
                            
                            })}
                        </select>
                    </div>
                    <div className="relative mt-2">
                        <input type="number" min={1} className="bg-gray-50 border outline-none pl-2 rounded-lg py-1" placeholder="sets" name="series" value={series} onChange={(e) => onChangeExercise(e)} />
                    </div>
                    <div className="relative mt-2">
                        <input type="number" min={1} className="bg-gray-50 border outline-none pl-2 rounded-lg py-1" placeholder="reps" name="repetitions" value={repetitions} onChange={(e) => onChangeExercise(e)} />
                    </div>
                    <div className="relative mt-2">
                        <input type="number" min={1} className="bg-gray-50 border outline-none pl-2 rounded-lg py-1" placeholder="rest" name="rest" value={rest} onChange={(e) => onChangeExercise(e)} />
                    </div>
                    <div className="relative mt-4 w-full border">
                        <button onClick={(e) => {
                            addExercise(e)
                        }} className="bg-blue-500 w-full text-white px-4 py-2 rounded-lg">Add Exercise</button>
                    </div>
                </div>

                <div className="relative mt-5">
                    <RoutineTable exercises={exercisesShow} onDelete={deleteExercise} />
                </div>

                <div className="relative mt-4 w-full border">
                    <button onClick={(e) => createRoutine(e)} className="bg-blue-500 w-full text-white px-4 py-2 rounded-lg">Create Routine</button>
                </div>
            </form>
        </div>
    )
}

export default Dashboard_create_routine