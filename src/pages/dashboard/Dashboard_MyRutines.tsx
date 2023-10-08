import { getMyRoutines } from '../../actions/routines';
import Card_routine from '../../components/dashboard/UI/Card_routine';

const Dashboard_MyRutines = () => {

  const myRoutines = getMyRoutines()

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      {myRoutines.map((routine, index) => (
        <div key={index} className='p-4'
          onClick={(e) => (console.log("rutina: "+routine.id))}>
          <Card_routine
            id={routine.id}
            name={routine.name}
            description={routine.description}
            time={routine.time}
            exercise_number={routine.exercises_number}
          />
        </div>
      ))}
    </div>
  )
}

export default Dashboard_MyRutines