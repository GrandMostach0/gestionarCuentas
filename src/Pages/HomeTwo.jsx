import { useState } from "react";

import Cards from "../components/Cards";
import GraficaExample from "../components/graficaExample";

function HomeTwo() {

    const menu = ['Esta semana', 'Este mes', '3 meses', 'Este año']
    const [opcion, setOpcion] = useState(menu[0])

    return (
        <>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-500">Resumen de tus finanzas personales</p>
            <br />

            <div className="inline-block p-1 text-sm rounded-lg bg-gray-200">
                {menu.map((item, index) => (
                    <p 
                        key={index} 
                        onClick={() => setOpcion(item)}
                        className={`inline-block mx-2 p-1 cursor-pointer rounded-lg min-w-20 text-center ${opcion == item ? 'bg-white font-semibold' : 'text-gray-500'}`}
                    > { item } </p>
                ))}
            </div>
            
            <div className="mt-5">
                <div className="flex justify-between gap-4">
                    <Cards />
                    <Cards />
                    <Cards />
                    <Cards />
                </div>
            </div>
            <div className="my-2 flex justify-between gap-5">
                <section className="flex-1 rounded-lg border border-gray-200">
                    <GraficaExample />
                </section>

                <section className="flex-1 rounded-lg border border-gray-200">
                    <GraficaExample />
                </section>
            </div>
        </>

        

    )
}

export default HomeTwo;