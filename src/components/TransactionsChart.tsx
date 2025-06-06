import type { Transaction } from "../types/Transaction";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';


export default function({transactions} : {transactions: Transaction[]}){
    const preparePieData = (transactions: Transaction[]) => {
        const income = transactions
            .filter(t => t.type === 'Dochód')
            .reduce((sum, t) => sum + t.value, 0);
        const expenses = transactions
            .filter(t => t.type === 'Wydatek')
            .reduce((sum, t) => sum + t.value, 0);
        return [
            { name: 'Dochody', value: income, color: '#28a745'},
            { name: 'Wydatki', value: expenses, color: '#dc3545'}
        ]
    };

    const pieData = preparePieData(transactions);

    if(pieData.length === 0){
        return (
            <div>Brak tranzakcji</div>
        )
    }

    const pieChart = () => (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill='#8884d8'
                dataKey="value"
                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                    {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
    return(
      <div>{pieChart()}</div>  
    );
}