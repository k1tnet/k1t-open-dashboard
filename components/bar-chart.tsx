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
  yLabel?: string; // Y軸のラベル
}

const BarChartComponent: FC<BarChartComponentProps> = ({
  title,
  data,
  dataKeys,
  xKey = "name",
  colors = ["#8884d8", "#82ca9d", "#ffc658"],
  yLabel = "人数",
}) => {
  // X軸のラベルの最大長を取得
  const longestLabelLength = Math.max(...data.map((d) => d[xKey]?.length || 0));

  // ラベルの長さに応じて高さとラベル角度を調整
  const extraHeight = longestLabelLength > 5 ? 140 : 80;
  const labelAngle = longestLabelLength > 5 ? -45 : 0;

  // X軸のデータ数に応じて最小幅を調整（1項目につき75px）
  const minChartWidth = Math.max(900, data.length * 75);

  // カスタムX軸のラベルをレンダリング
  const renderCustomXAxisTick = (props: any) => {
    const { x, y, payload } = props;

    return (
      <g transform={`translate(${x},${y})`}>
        <Text
          dy={10}
          fontSize={12}
          textAnchor="end"
          transform={`rotate(${labelAngle})`}
          x={0}
          y={0}
        >
          {payload.value}
        </Text>
      </g>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-600">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-200">
        {title}
      </h2>
      <div className="w-full" style={{ minWidth: `${minChartWidth}px` }}>
        <ResponsiveContainer height={400 + extraHeight} width="100%">
          <BarChart
            data={data}
            margin={{
              left: 60,
              right: 30,
              bottom: extraHeight, // ラベルが長い場合に余白を確保
            }}
          >
            <XAxis
              dataKey={xKey}
              interval={0} // すべてのラベルを表示
              tick={renderCustomXAxisTick} // カスタムラベル関数を適用
            />
            <YAxis
              label={{
                value: yLabel,
                angle: -90,
                position: "insideLeft",
                dy: -5,
              }}
            />
            <Tooltip />
            {dataKeys.map((key, index) => (
              <Bar
                key={`${key}-${index}`}
                dataKey={key}
                fill={colors[index % colors.length]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartComponent;
