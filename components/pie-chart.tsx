import { FC } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface PieChartComponentProps {
  title: string;
  data: any[];
  dataKey?: string;
  nameKey?: string;
  colors?: string[];
}

const PieChartComponent: FC<PieChartComponentProps> = ({
  title,
  data,
  dataKey = "value",
  nameKey = "name",
  colors = ["#8884d8", "#82ca9d", "#ffc658"],
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-200">
        {title}
      </h2>
      <ResponsiveContainer height={300} width="100%">
        <PieChart>
          <Pie
            cx="50%"
            cy="50%"
            data={data}
            dataKey={dataKey}
            endAngle={-270}
            nameKey={nameKey}
            outerRadius={100}
            startAngle={90}
          >
            {data.map((entry, index) =>
              entry[nameKey] ? (
                <Cell
                  key={`${entry[nameKey] ?? "unknown"}-${index}`}
                  fill={colors[index % colors.length]}
                />
              ) : null
            )}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
