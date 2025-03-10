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
import DataTable from "@/components/data-table";
import { siteConfig } from "@/config/site"; // site.ts をインポート

export default function AdmissionDashboard() {
  const [data, setData] = useState<any>(null);
  const [year, setYear] = useState<string>(
    siteConfig.yearLists[siteConfig.yearLists.length - 1]
  ); // 初期値を最新年度に設定

  useEffect(() => {
    fetch(`/data/admission-results-${year}.json`) // 年度に応じたデータを取得
      .then((res) => res.json())
      .then((json) => setData(json.admission_results));
  }, [year]); // 年度が変更されるたびにデータを再取得

  if (!data)
    return <div className="text-center py-10 text-gray-500">Loading...</div>;

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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KpiCard
          icon={
            <UsersIcon className="h-10 w-10 text-blue-500 dark:text-blue-300" />
          }
          title="総志願者数"
          value={data.total?.applicants || 0}
        />
        <KpiCard
          icon={
            <AcademicCapIcon className="h-10 w-10 text-green-500 dark:text-green-300" />
          }
          title="総合格者数"
          value={data.total?.admitted || 0}
        />
        <KpiCard
          icon={
            <ArrowTrendingUpIcon className="h-10 w-10 text-yellow-500 dark:text-yellow-300" />
          }
          title="総入学者数"
          value={data.total?.enrolled || 0}
        />
        <KpiCard
          icon={
            <BriefcaseIcon className="h-10 w-10 text-purple-500 dark:text-purple-300" />
          }
          title="在籍学生数"
          value={data.total?.current_students || 0}
        />
      </div>

      {/* 志願者データ */}
      <BarChartComponent
        data={data.regions}
        dataKeyMapping={{ applicants: "志願者数" }}
        dataKeys={["applicants"]}
        title="都道府県別 志願者数"
        xKey="prefecture"
        yLabel="人数"
      />

      {/* 合格者データ */}
      <BarChartComponent
        data={data.regions}
        dataKeyMapping={{ admitted: "合格者数" }}
        dataKeys={["admitted"]}
        title="都道府県別 合格者数"
        xKey="prefecture"
        yLabel="人数"
      />

      {/* 入学者データ */}
      <BarChartComponent
        data={data.regions}
        dataKeyMapping={{ enrolled: "入学者数" }}
        dataKeys={["enrolled"]}
        title="都道府県別 入学者数"
        xKey="prefecture"
        yLabel="人数"
      />

      {/* 地域別在籍者数 */}
      <DataTable
        columns={[
          { key: "region", label: "地域" },
          { key: "prefecture", label: "都道府県" },
          { key: "current_students", label: "在籍者数" },
        ]}
        data={data.regions.map((region: any) => ({
          region: region.region,
          prefecture: region.prefecture,
          current_students: region.current_students,
        }))}
        title="地域別 在籍者数"
      />

      {/* 特別奨学生の地域別分布 */}
      <BarChartComponent
        data={data.regions}
        dataKeyMapping={{
          special_scholarship_fellow: "スカラシップフェロー",
          special_scholarship_member: "スカラシップメンバー",
        }}
        dataKeys={["special_scholarship_fellow", "special_scholarship_member"]}
        title="特別奨学生の地域別分布"
        xKey="prefecture"
        yLabel="人数"
      />
    </div>
  );
}
