import React from 'react';
import PropTypes from 'prop-types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Chart = ({ data }) => (
  <div className="area-chart">
    <ResponsiveContainer>
      <AreaChart data={data} margin={{ top: 30, right: 0, left: 0, bottom: 50 }} >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0069ff" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#0069ff" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#e6edfd" />
        <XAxis
          allowDataOverflow={true}
          tickFormatter={data => data.split(',').slice(1, 2)}
          stroke="#cbd3e1"
          dataKey="name"
        />
        <YAxis
          stroke="#cbd3e1"
          tickFormatter={data => data.toPrecision(4)}
          allowDataOverflow={true}
          domain={['auto', 'auto']}
        />
        <Tooltip formatter={value => [value]}/>}/>
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#0069ff"
          fillOpacity={1}
          fill="url(#colorUv)"
          strokeWidth={2}
          dot={{ r: 2, strokeWidth: 2 }}
          activeDot={{ r: 4 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

Chart.propTypes = {
  data: PropTypes.array.isRequired
};

export default Chart;
