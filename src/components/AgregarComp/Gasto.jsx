import { useState } from "react";

function Gasto({tipo}) {

    const categorias = [
        {
            categoria: 'Gasto',
            listaOpciones: [
                {text: 'Comida', icon: ''},
                {text: 'Transporte', icon: ''},
                {text: 'Entretenimiento', icon: ''},
                {text: 'Servicios', icon: ''},
                {text: 'Salud', icon: ''},
                {text: 'Eduación', icon: ''},
                {text: 'Otros', icon: ''}
            ]
        },
        {
            categoria: 'Ingreso',
            listaOpciones: [
                {text: 'Salario', icon: ''},
                {text: 'Freelancer', icon: ''},
                {text: 'Inversión', icon: ''},
                {text: 'Otros', icon: ''}
            ]
        }
    ]

    const categoriaEncontrada = categorias.find( item => item.categoria === tipo);
    const [opSelec, setOpSelect] = useState(categoriaEncontrada.listaOpciones[0])
    const hoy = new Date().toISOString().split('T')[0]

    return (
        <form action="" className="border p-2 rounded">
            <label className="font-semibold" htmlFor="montoDinero">Monto:</label>
            <input className="block border w-full p-2 rounded-lg" type="number" name="montoDinero"/>
            
            <p className="font-semibold mt-2">Categoría:</p>
            <div className="grid grid-cols-4 gap-2 text-center mb-2">
                {categoriaEncontrada && categoriaEncontrada.listaOpciones.map((item, index) => (
                    <p className={`border p-1 rounded-lg w-full min-h-20 cursor-pointer ${item.text === opSelec.text ? 'bg-gray-100': ''}`} onClick={() => setOpSelect(item)} key={index}>{item.text}</p>
                ))}
            </div>
            
            <label className="font-semibold" htmlFor="descripcion">Descripción:</label>
            <textarea className="block border w-full rounded-lg" name="descripción" id="descripcion"></textarea>
            
            <label className="font-semibold mt-2" htmlFor="fecha">Fecha:</label>
            <input className="block border w-full p-2 rounded-lg" type="date" name="fecha" defaultValue={hoy}/>
            
            <button className="my-5 w-full p-2 rounded-lg cursor-pointer font-semibold bg-gray-200">Guardar {tipo}</button>
        </form>
    )
}

export default Gasto;