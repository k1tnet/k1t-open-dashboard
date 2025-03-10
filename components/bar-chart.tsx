import { FC } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface BarChartComponentProps {
  title: string;
  data: any[];
  dataKeys: string[];
  xKey?: string;
  colors?: string[];
  yLabel?: string;
  nameMapping?: Record<string, string>;
  dataKeyMapping?: Record<string, string>;
}

const BarChartComponent: FC<BarChartComponentProps> = ({
  title,
  data,
  dataKeys,
  xKey = "name",
  colors = ["#8884d8", "#82ca9d", "#ffc658"],
  yLabel = "人数",
  nameMapping = {},
  dataKeyMapping = {},
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
        <text
          dy={16}
          fontSize={11}
          textAnchor="end"
          transform={`rotate(${labelAngle})`}
          x={0}
          y={0}
        >
          {label}
        </text>
      </g>
    );
  };

  // データ数に応じてチャートの最小幅を計算 (1データあたり50px～80px程度を目安)
  const minChartWidth = data.length * 80;

  return (
    // (1) このラッパに overflow-x: auto を指定
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {/* (2) ResponsiveContainer を内包する要素に minWidth を指定して横スクロールを有効に */}
      <div style={{ minWidth: minChartWidth }}>
        <ResponsiveContainer height={400 + extraHeight} width="100%">
          <BarChart
            data={data}
            margin={{ left: 60, right: 30, bottom: extraHeight }}
          >
            <XAxis
              dataKey={xKey}
              interval={0}
              tick={renderCustomXAxisTick}
              tickMargin={16}
            />
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
    </div>
  );
};

export default BarChartComponent;
