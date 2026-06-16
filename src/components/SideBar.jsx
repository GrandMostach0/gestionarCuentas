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

    const opciones = [
        { titulo: 'Dashboard', url: '/HomeTwo' },
        { titulo: 'Agregar', url: '/Agregar' },
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

    return (
        <section className="text-left flex flex-col text-sm bg-white dark:bg-gray-900 dark:text-white min-h-screen p-2">
            <div className="p-2">
                <h1 className="text-2xl font-bold">Gastos App</h1>
                <span className="text-xs">Control de gastos financieros</span>
            </div>

            <div className="flex flex-col flex-1">
                {opciones.map((item, index) => (
                    <div key={index}>
                        <a
                            href={item.subOpciones ? undefined : item.url}
                            onClick={item.subOpciones ? () => toggleSubmenu(index) : undefined}
                            className="flex justify-between items-center p-2 cursor-pointer"
                        >
                            {item.titulo}
                            {item.subOpciones && (
                                <span>{openIndex === index ? '▲' : '▼'}</span>
                            )}
                        </a>

                        {item.subOpciones && openIndex === index && (
                            <div className="pl-4">
                                {item.subOpciones.map((sub, subIndex) => (
                                    <a key={subIndex} href={sub.url} className="block p-2 text-xs border-l border-gray-400">
                                        {sub.titulo}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-auto">
                <p onClick={toggleTheme} className="block p-2 cursor-pointer text-black dark:text-white">{theme === "light" ? "Blanco" : "Oscuro"}</p>
                <a href="/" onClick={() => {sessionStorage.removeItem('app_session_active'); localStorage.removeItem('app_pin'); navigate('/') }} className="block p-2 cursor-pointer">Salir</a>
            </div>
        </section>
    )
}

export default SideBar
