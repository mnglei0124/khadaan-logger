"use client";
import React from "react";
import { useReport } from "../../context/ReportContext";
import { statusColors, statusOptions } from "../../constants";

export default function GraphsPage() {
  const { reports, logs } = useReport();

  const statusCounts = statusOptions.reduce((acc, status) => {
    acc[status] = reports.filter((r) => r.status === status).length;
    return acc;
  }, {} as Record<string, number>);

  const total = Object.values(statusCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-stone-800 mb-2">データ分析</h2>
        <p className="text-stone-600">
          レポートの統計情報とグラフを確認できます
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
          <h3 className="text-xl font-semibold text-stone-800 mb-6">
            ステータス分布
          </h3>
          <div className="space-y-4">
            {statusOptions.map((status) => {
              const count = statusCounts[status];
              const percentage = total > 0 ? (count / total) * 100 : 0;
              return (
                <div key={status} className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColors[status]} min-w-16 text-center`}
                  >
                    {status}
                  </span>
                  <div className="flex-1 bg-stone-100 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        status === "完了"
                          ? "bg-emerald-400"
                          : status === "エラー"
                          ? "bg-red-400"
                          : "bg-amber-400"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-stone-600 text-sm min-w-16">
                    {count} ({Math.round(percentage)}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
          <h3 className="text-xl font-semibold text-stone-800 mb-6">
            サマリー
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-stone-50 rounded-xl">
              <div className="text-2xl font-bold text-stone-800">
                {reports.length}
              </div>
              <div className="text-sm text-stone-600">総レポート数</div>
            </div>
            <div className="text-center p-4 bg-emerald-50 rounded-xl">
              <div className="text-2xl font-bold text-emerald-800">
                {statusCounts["完了"]}
              </div>
              <div className="text-sm text-emerald-600">完了済み</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-xl">
              <div className="text-2xl font-bold text-red-800">
                {statusCounts["エラー"]}
              </div>
              <div className="text-sm text-red-600">エラー</div>
            </div>
            <div className="text-center p-4 bg-amber-50 rounded-xl">
              <div className="text-2xl font-bold text-amber-800">
                {statusCounts["停止"]}
              </div>
              <div className="text-sm text-amber-600">停止中</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
          <h3 className="text-xl font-semibold text-stone-800 mb-6">
            最近の活動
          </h3>
          <div className="space-y-3">
            {logs.slice(0, 5).map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between p-3 bg-stone-50 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-medium border ${
                      statusColors[log.status]
                    }`}
                  >
                    {log.status}
                  </span>
                  <span className="font-medium text-stone-800">
                    {log.reportName}
                  </span>
                </div>
                <span className="text-sm text-stone-500">
                  {log.timestamp.toLocaleString("ja-JP")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
