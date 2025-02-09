import { FC } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Text,
} from "recharts";
interface BarChartComponentProps {
  title: string;
  data: any[];
  dataKeys: string[];
  xKey?: string;
  colors?: string[];
  yLabel?: string;
  nameMapping?: Record<string, string>;
  dataKeyMapping?: Record<string, string>; // 追加: "male" → "男性" などのマッピング
}

const BarChartComponent: FC<BarChartComponentProps> = ({
  title,
  data,
  dataKeys,
  xKey = "name",
  colors = ["#8884d8", "#82ca9d", "#ffc658"],
  yLabel = "人数",
  nameMapping = {},
  dataKeyMapping = {}, // デフォルトはそのままのキー
}) => {
  // X軸のラベルの最大長を取得
  const longestLabelLength = Math.max(
    ...data.map((d) => (nameMapping[d[xKey]] || d[xKey] || "").length)
  );

  // ラベルの長さに応じて高さとラベル角度を調整
  const extraHeight = longestLabelLength > 5 ? 140 : 80;
  const labelAngle = longestLabelLength > 5 ? -45 : 0;

  // X軸のカスタムラベル
  const renderCustomXAxisTick = (props: any) => {
    const { x, y, payload } = props;
    const label = nameMapping[payload.value] || payload.value;

    return (
      <g transform={`translate(${x},${y})`}>
        <Text
          dy={10}
          fontSize={12}
          textAnchor="end"
          transform={`rotate(${labelAngle})`}
        >
          {label}
        </Text>
      </g>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <ResponsiveContainer height={400 + extraHeight} width="100%">
        <BarChart
          data={data}
          margin={{ left: 60, right: 30, bottom: extraHeight }}
        >
          <XAxis dataKey={xKey} tick={renderCustomXAxisTick} />
          <YAxis
            label={{
              value: yLabel,
              angle: -90,
              position: "insideLeft",
              dy: -5,
            }}
          />
          <Tooltip
            formatter={(value, name) => [
              value,
              dataKeyMapping[name as string] || name,
            ]}
          />
          {dataKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={colors[index % colors.length]}
              name={dataKeyMapping[key] || key}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
