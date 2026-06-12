function Cards({numero = 0, subtexto = 'Sin transacciones'}) {

    return (
        <div className="border border-gray-200 w-full text-sm p-4 rounded-lg">
            <div className="flex items-center justify-between">
                <p>Total gastado</p>
                <span className="border rounded-2xl p-1 text-xs bg-green-100 text-green-500">icono</span>
            </div>

            <p className="text-3xl font-semibold">${numero}</p>
            <span className="text-gray-500">{subtexto}</span>
        </div>
    )
}

export default Cards;