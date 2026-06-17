import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SideBar() {
    const navigate = useNavigate()
    const [openIndex, setOpenIndex] = useState(null)

    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) return savedTheme
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    })

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark")
        localStorage.setItem("theme", theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
    }

    // 1. 👇 CORREGIDO: Quitamos las '/' iniciales para que sean rutas relativas al dashboard
    const opciones = [
        { titulo: 'Dashboard', url: 'HomeTwo' },
        { titulo: 'Agregar', url: 'Agregar' },
        { titulo: 'Presupuesto', url: '' },
        {
            titulo: 'Ahorro',
            url: '',
            subOpciones: [
                { titulo: 'Sub 1', url: '' },
                { titulo: 'Sub 2', url: '' },
            ]
        },
        { titulo: 'Historial', url: '' },
        { 
            titulo: 'Estadísticas',
            url: '',
            subOpciones: [
                { titulo: 'Sub 1', url: '' },
                { titulo: 'Sub 2', url: '' },
            ]
        },
    ]

    const toggleSubmenu = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    // 2. 👇 Nueva función manejadora para los clicks del menú sin usar href nativos
    const handleNavigation = (url) => {
        if (url) navigate(url);
    }

    return (
        <section className="text-left flex flex-col text-sm bg-white dark:bg-gray-900 dark:text-white min-h-screen p-2">
            <div className="p-2">
                <h1 className="text-2xl font-bold">Gastos App</h1>
                <span className="text-xs">Control de gastos financieros</span>
            </div>

            <div className="flex flex-col flex-1">
                {opciones.map((item, index) => (
                    <div key={index}>
                        {/* 3. 👇 CORREGIDO: Cambiamos 'a' por 'button' o un div con onClick controlado */}
                        <button
                            onClick={item.subOpciones ? () => toggleSubmenu(index) : () => handleNavigation(item.url)}
                            className="flex justify-between items-center p-2 cursor-pointer w-full text-left"
                        >
                            <span>{item.titulo}</span>
                            {item.subOpciones && (
                                <span>{openIndex === index ? '▲' : '▼'}</span>
                            )}
                        </button>

                        {item.subOpciones && openIndex === index && (
                            <div className="pl-4">
                                {item.subOpciones.map((sub, subIndex) => (
                                    <button 
                                        key={subIndex} 
                                        onClick={() => handleNavigation(sub.url)} 
                                        className="block p-2 text-xs border-l border-gray-400 w-full text-left"
                                    >
                                        {sub.titulo}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-auto">
                <p onClick={toggleTheme} className="block p-2 cursor-pointer text-black dark:text-white">
                    {theme === "light" ? "Blanco" : "Oscuro"}
                </p>
                
                {/* 4. 👇 CORREGIDO: Botón de salir limpio, quitamos localStorage.removeItem('app_pin') si deseas conservar el pin creado */}
                <button 
                    onClick={() => {
                        sessionStorage.removeItem('app_session_active'); 
                        navigate('/', { replace: true }); 
                    }} 
                    className="block p-2 cursor-pointer text-left w-full text-red-500 hover:text-red-400 font-medium"
                >
                    Salir
                </button>
            </div>
        </section>
    )
}

export default SideBar;