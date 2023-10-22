import { useEffect, useState } from 'react'
import logo from '../../assets/logo.png'
import { logout, verify_user } from '../../actions/auth'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../store/store'
import { connect } from 'react-redux'

type SideBarProps = {
    logout: any,
    access: any
}

const Sidebar: React.FC<SideBarProps> = ({logout, access}) => {

    const [showSideBar, setShowSideBar] = useState(false)

    const navLinks = [
        {
            display: 'My Rutines',
            path: '/dashboard/myRutines'
        },
        {
            display: 'Rutinas Recomendadas',
            path: '/dashboard/recomendedRutines'
        },
        {
            display: 'Crear Rutina',
            path: '/dashboard/makeRutine'
        }
    ]
    const navigate = useNavigate()
    const handleLogOut = (e:any) => {
        e.preventDefault()
        logout()
    }

    useEffect(() => {
        const checkUser = async () => {
            const userVerified = await verify_user(access);
            if (!userVerified) {
                navigate('/');
            }
        };

        checkUser();
    }, [access]);

    return (
        <>
            <button
                type="button"
                className="inline-flex items-center p-2 mt-2 ml-3 text-sm rounded-lg sm:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
                onClick={(e) => {
                    e.stopPropagation();
                    setShowSideBar(!showSideBar);
                }}
            >
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside
                id="logo-sidebar"
                aria-label="Sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${showSideBar ? "-translate-x-full" : ""} sm:translate-x-0`}
                onPointerLeave={(e) => {
                    e.stopPropagation();
                    setShowSideBar(!showSideBar);
                }}
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800">
                    <a href="https://flowbite.com/" className="flex items-center pl-2.5 mb-5">
                        <img src={logo} className="h-6 mr-3 sm:h-10" alt="Flowbite Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap text-white">Virtual Coach</span>
                    </a>
                    <ul className="space-y-2 font-medium">
                        {navLinks.map((navLink, index) => (
                            <li key={index}>
                                <a href={navLink.path} className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group">
                                    {/* <svg className="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                            </svg> */}
                                    <span className="ml-3">{navLink.display}</span>
                                </a>
                            </li>
                        ))}
                        <li>
                            <a 
                            onClick={(e) => handleLogOut(e)}
                            className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group">
                                <span className="ml-3">Log Out</span>
                            </a>
                        </li>

                    </ul>
                </div>
            </aside>
        </>
    )
}

const mapStateToProps = (state: RootState) => ({
    access: state.access
})

export default connect(mapStateToProps, { logout })(Sidebar)