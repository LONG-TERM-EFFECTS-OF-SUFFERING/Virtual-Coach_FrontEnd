import { useEffect, useState } from 'react';
import Card_routine from '../../components/dashboard/UI/Card_routine';
import { user_routines } from '../../actions/api/routines';
import { useAppSelector } from '../../store/hooks/hooks';
import LoadingAlert from '../../components/alerts/LoadingAlert';

const Dashboard_MyRutines = () => {

  const email = useAppSelector((state) => state.user && state.user.email ? state.user.email : 0);
  const [myRoutines, setMyRoutines] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getRoutines = async () => {
      const { data, error } = await user_routines(email)
      if (!error) {
        setMyRoutines(data)
        setLoading(false)
      }
    }
    console.log(myRoutines)
    getRoutines()
  }, [])

  return (
    <>
      {loading &&
        <div className="bg-gray-800 rounded-lg min-h-screen flex items-center justify-center">
          <LoadingAlert />
        </div>
      }
      {!loading && myRoutines.length != 0 &&
        <div className="bg-gray-800 rounded-lg p-4 min-h-screen">
          {myRoutines.length === 0 && <div className="text-white text-center">You don't have any routine yet</div>}
          {myRoutines.map((routine_reg, index) => {
            const routine = routine_reg['routine']
            return (
              <div key={index} className='p-4'
                onClick={() => (console.log("rutina: " + routine['name']))}>
                <Card_routine
                  id={routine['id']}
                  name={routine['name']}
                  description={routine['description']}
                  time={routine['time']}
                  exercise_number={routine['exercises_number']}
                />
              </div>
            )
          })}
        </div>
      }
      {!loading && myRoutines.length == 0 &&
        <div className="bg-gray-800 rounded-lg min-h-screen flex items-center justify-center">
          <div className="text-white text-center">You don't have any routine yet</div>
        </div>
      }
    </>
  )
}

export default Dashboard_MyRutines