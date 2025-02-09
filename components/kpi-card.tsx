import { FC } from "react";

interface KpiCardProps {
  title: string;
  value: number;
  icon: JSX.Element;
}

const KpiCard: FC<KpiCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex items-center">
      <div className="mr-4">{icon}</div>
      <div>
        <p className="text-gray-900 dark:text-gray-200">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );
};

export default KpiCard;
