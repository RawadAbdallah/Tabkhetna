// src/components/CircularBar.tsx
import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

interface CircularBarProps {
  malePercentage: number;
  femalePercentage: number;
}

const CircularBar: React.FC<CircularBarProps> = ({ malePercentage, femalePercentage }) => {
  const data = [
    { title: 'Female', value: femalePercentage, color: 'rgb(255, 147, 129)' },
    { title: 'Male', value: malePercentage, color: 'blue' },
  ];

  return (
    <div className='gender-percentage-container'>
      <h2>Gender Percentage</h2>
      <p>Male <span className="male-square"></span></p>
      <p>Female <span className="female-square"></span></p>
      <div>
        <PieChart
          data={data}
          lineWidth={15}
          label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
          labelStyle={{
            fontSize: '5px',
            fontFamily: 'sans-serif',
            fill: '#fff',
          }}
          rounded
          style={{width:'100%', maxWidth:"300px"}}
        />
      </div>
    </div>
  );
};

export default CircularBar;
