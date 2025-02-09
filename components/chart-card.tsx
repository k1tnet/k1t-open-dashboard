import { FC, ReactNode } from "react";

interface ChartCardProps {
  title: string;
  children: ReactNode;
  width?: string; // カードの幅
  height?: string; // カードの高さ
}

const ChartCard: FC<ChartCardProps> = ({
  title,
  children,
  width = "w-full",
  height = "h-auto min-h-[300px]",
}) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow ${width} ${height}`}
    >
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-200">
        {title}
      </h2>
      {children}
    </div>
  );
};

export default ChartCard;
