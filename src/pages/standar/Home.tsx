import { useNavigate } from 'react-router-dom'
import NavBar from '../../components/Navbar.tsx'

const Home = () => {

  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/sign-up');
  }

  const handleLoginClick = () => {
    navigate('/login')
  }

  return (
    <div className="bg-cover bg-center h-screen" style={{ backgroundImage: `url('../src/assets/landing_page_background.jpg')` }}>
      <NavBar />
      <div className="flex justify-center items-center h-full px-16 pt-32">
        <section className="mb-32">
          <div className="flex flex-wrap">
            <div className="mb-12 w-full shrink-0 grow-0 basis-auto lg:mb-0 lg:w-5/12">
              <div className="flex lg:py-12">
                <img src="../src/assets/gym_picture.jpg"
                  className="w-full rounded-lg shadow-lg dark:shadow-black/20 lg:ml-[50px] z-[10]" alt="image" />
              </div>
            </div>
            <div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
              <div className="flex h-full items-center rounded-lg bg-sky-600 p-6 text-center text-white lg:pl-12 lg:text-left">
                <div className="lg:pl-12">
                  <h2 className="mb-6 text-3xl font-bold">
                    ¡Bienvenido a Virtual Coach!
                  </h2>
                  <p className="mb-6 pb-2 lg:pb-0">
                    Virtual-Coach es tu guía de entrenamiento personal que te permitirá tomar rutinas predefinidas
                    hechas por nuestros expertos en el acondicionamiento físico. También te permite realizar tus 
                    propias rutinas a partir de nuestra elaborada y mas completa colección que ejercicios que
                    puedas encontrar en la web.
                    <br/>
                    <br/>
                    ¡Anímate! <i>"Si entrenas duro, no solo serás duro, serás duro de superar"</i>
                  </p>
                  <button type="button"
                    className="rounded-full border-2 border-neutral-50 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-100 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 mr-2"
                    data-te-ripple-init data-te-ripple-color="light"
                    onClick={handleSignUpClick}>
                    Registrarme
                  </button>
                  <button type="button"
                    className="rounded-full border-2 border-neutral-50 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-100 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 ml-2"
                    data-te-ripple-init data-te-ripple-color="light"
                    onClick={handleLoginClick}>
                    Iniciar sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

  )
}

export default Home