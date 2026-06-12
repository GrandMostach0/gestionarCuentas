import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function GraficaExample() {

    const data = [
        {mes: 'Ene', ventas: 400},
        {mes: 'Feb', ventas: 500},
        {mes: 'Mar', ventas: 100}
    ]

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="ventas" fill='#8884d8' />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default GraficaExample;