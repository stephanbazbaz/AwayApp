import React from 'react'
import './style.css';
import { Bar } from 'react-chartjs-2';
export default function Reports({ allVacations }) {

    const [vacs, setvacs] = React.useState([])

    React.useEffect(() => {
        console.log(allVacations);
        for (let i = 0; i < allVacations.length; i++) {
            let filtered = allVacations.filter(el => el.followers.length > 0);
            setvacs(filtered)
        }
    }, [allVacations])

    return (
        <div className='reports-container'>
            <h1>Reports</h1>
            <Bar
                data={{
                    labels: vacs.map(item => {
                        return (
                            item.description
                        )
                    }),
                    datasets: [{
                        label: 'Amount Of Followers Per Vacation',
                        data: vacs.map(item => {
                            return (
                                item.followers.length
                            )
                        }),
                        backgroundColor: vacs.map(() => {
                            return (
                                'rgba(255, 99, 132, 0.2)'
                            )
                        }),
                        borderColor:
                            vacs.map(() => {
                                return (
                                    'rgb(255, 99, 132)'
                                )
                            }),
                        borderWidth: 1
                    }]
                }}
                width={100}
                height={300}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                }
                            }
                        ]
                    }
                }}
            />
        </div>
    )
}
