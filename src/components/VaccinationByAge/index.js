// Write your code here
import './index.css'
import {PieChart, Cell, Pie, Legend, ResponsiveContainer} from 'recharts'

const VaccinationByAge = props => {
  const {data} = props
  //   const colors = ['#2d87bb', '#a3df9f', '#64c2a6']

  //   const func = (entry, index) => {
  //     console.log(entry, index)

  //   }

  return (
    <div className="component-bg">
      <h1>Vaccination By Age</h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            cx="70%"
            cy="40%"
            data={data}
            startAngle={0}
            endAngle={360}
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="18-44" fill="#2d87bb" />
            <Cell name="44-60" fill="#a3df9f" />
            <Cell name="Above 60" fill="#64c2a6" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByAge
