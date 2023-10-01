import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'

const Error404 = () => {

  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/home')
  }

  return (
    <div className="bg-cover bg-center h-screen" style={{ backgroundImage: `url('../src/assets/landing_page_background.jpg')` }}>
      <Navbar />
      <section className="flex justify-center items-center h-full px-16 pt-16">
        <div className="bg-white rounded-3xl px-16">
        <div className="px-4 md:h-  lg:py-12">
          <div className="lg:gap-4 lg:flex">
            <div
              className="flex flex-col items-center justify-center pt-10  lg:py-24 xl:py-32"
            >
              <h1 className="font-bold text-blue-600 text-9xl">404</h1>
              <p
                className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl"
              >
                <span className="text-blue-500">Oops!</span> Sitio no encontrado
              </p>
              <p className="mb-8 text-center text-gray-500 md:text-lg">
                La página que estabas buscando no existe
              </p>
              <button className="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100"
              onClick={handleHomeClick}>
                Página principal
              </button>
            </div>
            <div className="flex items-center justify-center xl:w-max relative ">
              <img
                src="https://cdn-icons-png.flaticon.com/512/5753/5753159.png"
                alt="img"
                className="object-cover"
              />
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  )
}

export default Error404