import React, { useState, useEffect } from 'react';

interface Report {
  id: string;
  name: string;
  status: '完了' | 'エラー' | '停止';
  feedback: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ReportCardProps {
  report: Report;
  statusColors: Record<string, string>;
  statusOptions: readonly ("完了" | "エラー" | "停止")[];
  updateReportStatus: (reportId: string, newStatus: Report["status"]) => void;
  updateReportFeedback: (reportId: string, feedback: string) => void;
}

export default function ReportCard({
  report,
  statusColors,
  statusOptions,
  updateReportStatus,
  updateReportFeedback,
}: ReportCardProps) {
  const [currentFeedback, setCurrentFeedback] = useState(report.feedback);

  useEffect(() => {
    setCurrentFeedback(report.feedback);
  }, [report.feedback]);

  const handleSaveFeedback = () => {
    updateReportFeedback(report.id, currentFeedback);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-stone-800">{report.name}</h3>
        <select
          value={report.status}
          onChange={(e) => updateReportStatus(report.id, e.target.value as Report["status"])}
          className={`px-4 py-2 rounded-lg border text-sm font-medium ${statusColors[report.status]}`}
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-stone-700 mb-2">フィードバック</label>
        <textarea
          value={currentFeedback}
          onChange={(e) => setCurrentFeedback(e.target.value)}
          className="w-full p-3 border border-stone-200 rounded-lg resize-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300"
          rows={3}
          placeholder="フィードバックを入力してください..."
        />
        <button
          onClick={handleSaveFeedback}
          className="mt-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-lg hover:bg-emerald-200 transition-colors duration-200 text-sm font-medium"
        >
          フィードバックを保存
        </button>
      </div>

      <div className="text-sm text-stone-500">
        最終更新: {report.updatedAt.toLocaleString('ja-JP')}
      </div>
    </div>
  );
}
