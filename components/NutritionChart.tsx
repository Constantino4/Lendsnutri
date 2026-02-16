
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { FoodAnalysisResult } from '../types';

interface Props {
  data: FoodAnalysisResult['macros'];
}

const NutritionChart: React.FC<Props> = ({ data }) => {
  const chartData = [
    { name: 'Proteína', value: data.protein || 0, color: '#3b82f6' },
    { name: 'Carboidrato', value: data.carbs || 0, color: '#f59e0b' },
    { name: 'Gordura', value: data.fat || 0, color: '#ef4444' },
    { name: 'Fibra', value: data.fiber || 0, color: '#10b981' },
  ].filter(d => d.value > 0);

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`${value}g`, 'Quantidade']}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NutritionChart;
