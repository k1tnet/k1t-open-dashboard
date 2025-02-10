"use client";

import { useEffect, useState } from "react";
import {
  UsersIcon,
  AcademicCapIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

import KpiCard from "@/components/kpi-card";
import BarChartComponent from "@/components/bar-chart";
import PieChartComponent from "@/components/pie-chart";
import { AdmissionResults, DepartmentData } from "@/types/college-student";
import { siteConfig } from "@/config/site"; // site.ts をインポート

export default function Dashboard() {
  const [data, setData] = useState<AdmissionResults | null>(null);
  const [year, setYear] = useState<string>(
    siteConfig.yearLists[siteConfig.yearLists.length - 1]
  ); // 初期値を siteConfig から取得

  useEffect(() => {
    fetch(`/data/college-students-${year}.json`) // 年度に応じたデータを取得
      .then((res) => res.json())
      .then((json: AdmissionResults) => setData(json));
  }, [year]); // 年度が変更されるたびに再取得

  if (!data)
    return <div className="text-center py-10 text-gray-500">Loading...</div>;

  const dataKeyMapping: Record<string, string> = {
    male: "男性",
    female: "女性",
  };

  return (
    <div className="p-8 space-y-8 bg-gray-100 dark:bg-gray-900 min-h-screen text-black dark:text-white">
      {/* 年度選択ドロップダウン */}
      <div className="flex justify-end mb-4">
        <label className="mr-2" htmlFor="year-select">
          年度選択:
        </label>
        <select
          className="px-3 py-2 border rounded-md bg-white dark:bg-gray-800"
          id="year-select"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          {siteConfig.yearLists.map((y) => (
            <option key={y} value={y}>
              {y} 年度
            </option>
          ))}
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard
          icon={
            <UsersIcon className="h-10 w-10 text-blue-500 dark:text-blue-300" />
          }
          title="総入学者数"
          value={
            data.admission_results.total.male +
            data.admission_results.total.female
          }
        />
        <KpiCard
          icon={
            <AcademicCapIcon className="h-10 w-10 text-green-500 dark:text-green-300" />
          }
          title="男性入学者数"
          value={data.admission_results.total.male}
        />
        <KpiCard
          icon={
            <UserGroupIcon className="h-10 w-10 text-pink-500 dark:text-pink-300" />
          }
          title="女性入学者数"
          value={data.admission_results.total.female}
        />
      </div>

      {/* 学科別 入学者数（男女別） */}
      <BarChartComponent
        data={data.admission_results.departments}
        dataKeyMapping={dataKeyMapping}
        dataKeys={["male", "female"]}
        title="学科別 入学者数（男女別）"
        xKey="department"
        yLabel="人数"
      />

      {/* 男女比率（全体） */}
      <PieChartComponent
        data={[
          { name: "男性", value: data.admission_results.total.male },
          { name: "女性", value: data.admission_results.total.female },
        ]}
        title="全体の男女比率"
      />

      {/* 学科別 男女比率 */}
      <PieChartComponent
        data={data.admission_results.departments.map(
          (dept: DepartmentData) => ({
            name: dept.department,
            value: dept.male + dept.female,
          })
        )}
        title="学科別 入学者数の割合"
      />
    </div>
  );
}
