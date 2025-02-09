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

export default function AdmissionDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/data/admission-results-2024.json") // データ取得先を修正
      .then((res) => res.json())
      .then((json) => setData(json.admission_results)); // JSON構造に合わせて修正
  }, []);

  if (!data)
    return <div className="text-center py-10 text-gray-500">Loading...</div>;

  return (
    <div className="p-8 space-y-8 bg-gray-100 dark:bg-gray-900 min-h-screen text-black dark:text-white">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <KpiCard
          icon={
            <UsersIcon className="h-10 w-10 text-blue-500 dark:text-blue-300" />
          }
          title="総志願者数"
          value={data.total.applicants}
        />
        <KpiCard
          icon={
            <AcademicCapIcon className="h-10 w-10 text-green-500 dark:text-green-300" />
          }
          title="総合格者数"
          value={data.total.admitted}
        />
        <KpiCard
          icon={
            <ArrowTrendingUpIcon className="h-10 w-10 text-yellow-500 dark:text-yellow-300" />
          }
          title="総入学者数"
          value={data.total.enrolled}
        />
        <KpiCard
          icon={
            <BriefcaseIcon className="h-10 w-10 text-purple-500 dark:text-purple-300" />
          }
          title="在籍学生数"
          value={data.total.current_students}
        />
        <KpiCard
          icon={
            <BriefcaseIcon className="h-10 w-10 text-red-500 dark:text-red-300" />
          }
          title="総卒業者数"
          value={data.total.graduates}
        />
      </div>

      {/* 志願者データ */}
      <BarChartComponent
        data={data.regions}
        dataKeys={["applicants"]}
        title="都道府県別 志願者数"
        xKey="prefecture"
        yLabel="人数"
      />

      {/* 合格者データ */}
      <BarChartComponent
        data={data.regions}
        dataKeys={["admitted"]}
        title="都道府県別 合格者数"
        xKey="prefecture"
        yLabel="人数"
      />

      {/* 入学者データ */}
      <BarChartComponent
        data={data.regions}
        dataKeys={["enrolled"]}
        title="都道府県別 入学者数"
        xKey="prefecture"
        yLabel="人数"
      />

      {/* 地域別在籍者数 */}
      <PieChartComponent
        data={data.regions.map((region: any) => ({
          name: region.region,
          value: region.current_students,
        }))}
        title="地域別 在籍者数"
      />

      {/* 特別奨学生の地域別分布 */}
      <BarChartComponent
        data={data.regions}
        dataKeys={["special_scholarship_fellow", "special_scholarship_member"]}
        title="特別奨学生の地域別分布"
        xKey="prefecture"
        yLabel="人数"
      />
    </div>
  );
}
