import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { PiPasswordLight, PiUserLight } from 'react-icons/pi';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { login, verify_user } from '../../actions/auth';
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import LoadingAlert from "../../components/alerts/LoadingAlert";
import FailedAlert from "../../components/alerts/FailedAlert";

type LoginProps = {
  login: any,
  access: any
}

const Login: React.FC<LoginProps> = ({ login, access }) => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [loginAlert, setLoginAlert] = useState({ show: false, status: "", message: "" })

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };


  const onChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const { email, password } = formData;


  const onSubmit = async (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    setLoginAlert({ show: true, status: "Loading", message: "" })
    const loginUser = async () => {
      const result = await login(email, password)
      return result
    }
    const { data, error } = await loginUser()
    const message = error ? data[Object.keys(data)[0]] : "Login Success"
    setLoginAlert({ show: error, status: error ? "Error" : "Success", message })
  }

  const navigate = useNavigate()
  useEffect(() => {
    const checkUser = async () => {
      const userVerified = await verify_user(access);
      if (userVerified) {
        navigate('/dashboard');
      }
    };

    checkUser();
  }, [access]);

  return (

    <div className="bg-white p-8 w-full md:w-96 rounded-xl">
      <div className="mb-3">
        {loginAlert.show && loginAlert.status == 'Loading' && <LoadingAlert />}
        {loginAlert.show && loginAlert.status == 'Error' && <FailedAlert message={loginAlert.message} />}
      </div>

      <h1 className="text-2xl font-bold mb-5 text-center">Iniciar Sesión</h1>
      <form className="flex flex-col gap-4" onSubmit={e => onSubmit(e)}>
        <div className="relative">
          <PiUserLight className={"absolute top-2 left-2"} />
          <input type="email" className="bg-gray-100 border w-full outline-none px-4 pl-7 rounded-lg py-1" placeholder="email" onChange={e => onChange(e)} name="email" value={email} />
        </div>
        <div className="relative">
          <PiPasswordLight className="absolute top-2 left-2" />
          <input type={showPassword ? "text" : "password"} className="bg-gray-100 border w-full outline-none px-8  rounded-lg py-1" placeholder="contraseña" onChange={e => onChange(e)} name="password" value={password} />
          {showPassword ? (
            <AiOutlineEye className="absolute top-2 right-2 hover:cursor-pointer" onClick={handleTogglePassword} />
          ) : (
            <AiOutlineEyeInvisible className="absolute top-2 right-2 hover:cursor-pointer" onClick={handleTogglePassword} />
          )}

        </div>
        <div>
          <button className="w-full mt-5 bg-sky-500 hover:bg-indigo-500 hover:scale-105  transition-all text-white rounded-md py-1 font-bold" type='submit'>
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  access: state.access
})


export default connect(mapStateToProps, { login })(Login)