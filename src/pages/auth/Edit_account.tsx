import { useState } from "react"
import { PiPasswordLight, PiUserLight } from 'react-icons/pi';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const EditAccount = () => {

  //const [formData, setFormData] = useState({
  //  name: "",
  //  password: "",
  //})

  const [showPassword, setShowPassword] = useState(false)

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  //const onChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value })

  //const onSubmit = async (e: any) => {
  //  e.preventDefault()
  //  console.log("SUCCESS")
  //}

  return (
    <div className="bg-gray-800 rounded-lg p-4 min-h-screen flex items-center justify-center">
      <div className="bg-gray-200 p-8 w-full md:w-96 rounded-xl">
        <h1 className="text-2xl font-bold mb-5 text-center">Editar información</h1>
        <p className="pb-4">Rellena los datos que desees modificar de tu cuenta</p>
        <form className="flex flex-col gap-4">
          <div className="relative">
            <PiUserLight className={"absolute top-2 left-2"} />
            <input type="name" className="bg-gray-100 border w-full outline-none px-4 pl-7 rounded-lg py-1" placeholder="Nombre completo" />
          </div>
          <div className="relative">
            <PiPasswordLight className="absolute top-2 left-2" />
            <input type={showPassword ? "text" : "password"} className="bg-gray-100 border w-full outline-none px-8  rounded-lg py-1" placeholder="contraseña" />
            {showPassword ? (
              <AiOutlineEye className="absolute top-2 right-2 hover:cursor-pointer" onClick={handleTogglePassword} />
            ) : (
              <AiOutlineEyeInvisible className="absolute top-2 right-2 hover:cursor-pointer" onClick={handleTogglePassword} />
            )}
          </div>
          <div>
            <button className="w-full mt-5 bg-sky-500 hover:bg-indigo-500 hover:scale-105  transition-all text-white rounded-md py-1 font-bold">
              Modificar datos
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditAccount