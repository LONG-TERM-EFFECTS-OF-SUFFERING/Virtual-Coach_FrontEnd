import { useState } from "react"
import { PiPasswordLight, PiUserLight } from 'react-icons/pi';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineMail } from 'react-icons/ai';
import { set_email, set_password, users_put } from "../../actions/api/auth";
import FailedAlert from "../../components/alerts/FailedAlert";
import LoadingAlert from "../../components/alerts/LoadingAlert";
import SuccessAlert from "../../components/alerts/SuccessAlert";
//import { useSelector } from "react-redux";

const EditAccount = () => {

  const [editedInfo, setEditedInfo] = useState({
    name: "",
    // For change email
    current_password_e: "",
    new_email: "",
    re_new_email: "",
  })
  const [passwordForm, setPasswordForm] = useState({
    new_password: "",
    re_new_password: "",
    current_password: ""
  })

  const { name, current_password_e, new_email, re_new_email } = editedInfo
  const { new_password, re_new_password, current_password } = passwordForm

  const [showPassword, setShowPassword] = useState(false)
  const [emailAlert, setEmailAlert] = useState({ show: false, status: "", msg: "" })
  const [passwordAlert, setPasswordAlert] = useState({ show: false, status: "", msg: "" })
  //const user = useSelector((state: any) => state.user)
  //const id = user ? user.id : null

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onChangeEditedInfo = (e: any) => {
    setEditedInfo({ ...editedInfo, [e.target.name]: e.target.value })
  }

  const onChangePasswordForm = (e: any) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value })
  }

  const onSubmitEditedInfo = async (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    const data = await users_put(name)
    console.log(data)
  }

  const onSubmitChangeEmail = async (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    setEmailAlert({ show: true, status: "Loading", msg: ""})
    const { data, error } = await set_email(new_email, re_new_email, current_password_e)
    const msg = error ? data[Object.keys(data)[0]][0] : "Email Changed Successfully"
    setEmailAlert({ show: error, status: error ? "Error":"Success" ,msg })

  }

  const onSubmitPasswordForm = async (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    setPasswordAlert({ show: true, status: "Loading", msg: ""})
    const {error, data} = await set_password(new_password, re_new_password, current_password)
    const msg = error ? data[Object.keys(data)[0]][0] : "Password Changed Successfully"
    setPasswordAlert({ show: error, status: error ? "Error":"Success" ,msg })
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4 min-h-screen flex items-center justify-center">
      <div className="bg-gray-200 p-8 w-full md:w-96 rounded-xl" >
        <h1 className="text-2xl font-bold mb-5 text-center">Cambiar Nombre</h1>
        <p className="pb-4">Rellena los datos que desees modificar de tu cuenta</p>
        <form className="flex flex-col gap-4" onSubmit={e => onSubmitEditedInfo(e)} >
          <div className="relative">
            <PiUserLight className={"absolute top-2 left-2"} />
            <input type="name" className="bg-gray-100 border w-full outline-none px-4 pl-7 rounded-lg py-1" placeholder="Nombre" onChange={e => onChangeEditedInfo(e)} name="name" value={name} />
          </div>
          <div>
            <button className="w-full mt-5 bg-sky-500 hover:bg-indigo-500 hover:scale-105  transition-all text-white rounded-md py-1 font-bold" type="submit"
            >
              Cambiar Nombre
            </button>
          </div>
        </form>

        <div className="mt-4">
          {!emailAlert.show && emailAlert.status=="Success" && <SuccessAlert message={emailAlert.msg} />}
          {emailAlert.show && emailAlert.status=="Loading" && <LoadingAlert />}
          {emailAlert.show && emailAlert.status=="Error" && <FailedAlert message={emailAlert.msg} />}
        </div>
        <h1 className="mt-5 text-2xl font-bold mb-5 text-center">Cambiar Email</h1>
        <form className="flex flex-col gap-4" onSubmit={e => onSubmitChangeEmail(e)} >
          <div className="relative">
            <AiOutlineMail className={"absolute top-2 left-2"} />
            <input type="name" className="bg-gray-100 border w-full outline-none px-4 pl-7 rounded-lg py-1" placeholder="Nuevo Email" onChange={e => onChangeEditedInfo(e)} name="new_email" value={new_email} />
          </div>
          <div className="relative">
            <AiOutlineMail className={"absolute top-2 left-2"} />
            <input type="name" className="bg-gray-100 border w-full outline-none px-4 pl-7 rounded-lg py-1" placeholder="Repite tu Nuevo Email" onChange={e => onChangeEditedInfo(e)} name="re_new_email" value={re_new_email} />
          </div>
          <div className="relative">
            <PiPasswordLight className="absolute top-2 left-2" />
            <input type="name" className="bg-gray-100 border w-full outline-none px-4 pl-7 rounded-lg py-1" placeholder="Escribe tu Contraseña" onChange={e => onChangeEditedInfo(e)} name="current_password_e" value={current_password_e} />
          </div>
          <div>
            <button className="w-full mt-5 bg-sky-500 hover:bg-indigo-500 hover:scale-105  transition-all text-white rounded-md py-1 font-bold" type="submit"
            >
              Cambiar Email
            </button>
          </div>
        </form>

        <div className="mt-4">
          {!passwordAlert.show && passwordAlert.status=="Success" && <SuccessAlert message={passwordAlert.msg} />}
          {passwordAlert.show && passwordAlert.status=="Loading" && <LoadingAlert />}
          {passwordAlert.show && passwordAlert.status=="Error" && <FailedAlert message={passwordAlert.msg} />}
        </div>
        <h1 className="mt-5 text-2xl font-bold mb-5 text-center">Cambiar Contraseña</h1>
        <form className="flex flex-col gap-4" onSubmit={e => onSubmitPasswordForm(e)} >
          <div className="relative">
            <PiPasswordLight className="absolute top-2 left-2" />
            <input type={showPassword ? "text" : "password"} className="bg-gray-100 border w-full outline-none px-8  rounded-lg py-1" placeholder="Nueva Contraseña" onChange={e => onChangePasswordForm(e)} name="new_password" value={new_password} />
            {showPassword ? (
              <AiOutlineEye className="absolute top-2 right-2 hover:cursor-pointer" onClick={handleTogglePassword} />
            ) : (
              <AiOutlineEyeInvisible className="absolute top-2 right-2 hover:cursor-pointer" onClick={handleTogglePassword} />
            )}
          </div>
          <div className="relative">
            <PiPasswordLight className="absolute top-2 left-2" />
            <input type={showPassword ? "text" : "password"} className="bg-gray-100 border w-full outline-none px-8  rounded-lg py-1" placeholder="Repite tu Nueva Contraseña" onChange={e => onChangePasswordForm(e)} name="re_new_password" value={re_new_password} />
            {showPassword ? (
              <AiOutlineEye className="absolute top-2 right-2 hover:cursor-pointer" onClick={handleTogglePassword} />
            ) : (
              <AiOutlineEyeInvisible className="absolute top-2 right-2 hover:cursor-pointer" onClick={handleTogglePassword} />
            )}
          </div>
          <div className="relative">
            <PiPasswordLight className="absolute top-2 left-2" />
            <input type={showPassword ? "text" : "password"} className="bg-gray-100 border w-full outline-none px-8  rounded-lg py-1" placeholder="Contraseña Actual" onChange={e => onChangePasswordForm(e)} name="current_password" value={current_password} />
            {showPassword ? (
              <AiOutlineEye className="absolute top-2 right-2 hover:cursor-pointer" onClick={handleTogglePassword} />
            ) : (
              <AiOutlineEyeInvisible className="absolute top-2 right-2 hover:cursor-pointer" onClick={handleTogglePassword} />
            )}
          </div>
          <div>
            <button className="w-full mt-5 bg-sky-500 hover:bg-indigo-500 hover:scale-105  transition-all text-white rounded-md py-1 font-bold" type="submit"
            >
              Cambiar Contraseña
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditAccount