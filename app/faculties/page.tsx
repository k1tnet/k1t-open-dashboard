"use client";

import { useEffect, useState } from "react";
import {
  UsersIcon,
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/solid";

import KpiCard from "@/components/kpi-card";
import BarChartComponent from "@/components/bar-chart";
import PieChartComponent from "@/components/pie-chart";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/data/faculty.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  if (!data)
    return <div className="text-center py-10 text-gray-500">Loading...</div>;

  return (
    <div className="p-8 space-y-8 bg-gray-100 dark:bg-gray-900 min-h-screen text-black dark:text-white">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KpiCard
          icon={
            <UsersIcon className="h-10 w-10 text-blue-500 dark:text-blue-300" />
          }
          title="総教員数"
          value={data.employment_type.reduce(
            (acc: number, curr: any) => acc + curr.value,
            0
          )}
        />
        <KpiCard
          icon={
            <AcademicCapIcon className="h-10 w-10 text-green-500 dark:text-green-300" />
          }
          title="教授数"
          value={
            data.faculty_positions.find((d: any) => d.name === "教授")?.value ||
            0
          }
        />
        <KpiCard
          icon={
            <ArrowTrendingUpIcon className="h-10 w-10 text-yellow-500 dark:text-yellow-300" />
          }
          title="准教授数"
          value={
            data.faculty_positions.find((d: any) => d.name === "准教授")
              ?.value || 0
          }
        />
        <KpiCard
          icon={
            <BriefcaseIcon className="h-10 w-10 text-purple-500 dark:text-purple-300" />
          }
          title="総職員数"
          value={data.staff.total}
        />
      </div>

      {/* 教員データ */}
      <PieChartComponent
        data={data.faculty_positions}
        title="職位別 教員構成"
      />
      <PieChartComponent
        data={data.employment_type}
        title="雇用形態別 教員構成"
      />
      <BarChartComponent
        data={data.faculty_by_department}
        dataKeys={["教授", "准教授", "講師"]}
        title="学科別 教員構成"
        yLabel="人数"
      />

      {/* 職員データ */}
      <PieChartComponent
        data={data.staff.by_position}
        title="職種別 職員構成"
      />
      <PieChartComponent data={data.staff.by_gender} title="性別別 職員構成" />
      <BarChartComponent
        data={data.staff.by_age}
        dataKeys={["value"]}
        title="年齢層別 職員構成"
        xKey="age_range"
        yLabel="人数"
      />
    </div>
  );
}
