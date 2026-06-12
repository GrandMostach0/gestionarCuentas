import { useState } from "react";

import Gasto from "../components/AgregarComp/Gasto";

function Agregar() {

    const opciones = ['Gasto', 'Ingreso'];
    const [opcionSelect, setOpcionSelect] = useState(opciones[0]);

    return (
        <>
            <h1 className="text-3xl font-bold">Agregar Transacción</h1>
            <p className="text-gray-500">Registra un ingreso o gasto</p>
            <br />

            <section className="w-[50%]">
                <div className="flex justify-around items-center gap-5 p-2 bg-gray-200 rounded-lg mb-5">
                    {opciones.map((item, index) => (
                        <p className={`w-full text-center mx-2 p-1 rounded-lg cursor-pointer ${opcionSelect == item ? 'font-semibold bg-white' : ''}`} onClick={() => setOpcionSelect(item)} key={index}>{item}</p>
                    ))}
                </div>
                <div>
                    <Gasto tipo={opcionSelect} />
                </div>

            </section>
        </>
    )
}

export default Agregar;