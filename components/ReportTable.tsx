import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface Report {
  id: string;
  name: string;
  status: '完了' | 'エラー' | '停止';
  feedback: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ReportTableProps {
  reports: Report[];
  statusColors: Record<string, string>;
  statusOptions: readonly ("完了" | "エラー" | "停止")[];
  updateReportStatus: (reportId: string, newStatus: Report["status"]) => void;
  updateReportFeedback: (reportId: string, feedback: string) => void;
}

export default function ReportTable({
  reports,
  statusColors,
  statusOptions,
  updateReportStatus,
  updateReportFeedback,
}: ReportTableProps) {
  const [feedbackStates, setFeedbackStates] = useState<Record<string, string>>({});

  useEffect(() => {
    const initialFeedbackStates: Record<string, string> = {};
    reports.forEach(report => {
      initialFeedbackStates[report.id] = report.feedback;
    });
    setFeedbackStates(initialFeedbackStates);
  }, [reports]);

  const handleFeedbackChange = (reportId: string, value: string) => {
    setFeedbackStates(prev => ({
      ...prev,
      [reportId]: value,
    }));
  };

  const handleSaveFeedback = (reportId: string) => {
    const feedbackToSave = feedbackStates[reportId];
    if (feedbackToSave !== undefined) {
      updateReportFeedback(reportId, feedbackToSave);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="text-left py-4 px-6 font-semibold text-stone-800">レポート名</th>
              <th className="text-left py-4 px-6 font-semibold text-stone-800">ステータス</th>
              <th className="text-left py-4 px-6 font-semibold text-stone-800">フィードバック</th>
              <th className="text-left py-4 px-6 font-semibold text-stone-800">最終更新</th>
              <th className="text-left py-4 px-6 font-semibold text-stone-800">アクション</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr
                key={report.id}
                className={`border-b border-stone-100 ${index % 2 === 0 ? 'bg-white' : 'bg-stone-25'}`}
              >
                <td className="py-4 px-6">
                  <div className="font-semibold text-stone-800">{report.name}</div>
                </td>
                <td className="py-4 px-6">
                  <select
                    value={report.status}
                    onChange={(e) => updateReportStatus(report.id, e.target.value as Report["status"])}
                    className={`px-3 py-1 rounded-lg border text-sm font-medium ${statusColors[report.status]}`}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-4 px-6">
                  <textarea
                    value={feedbackStates[report.id] || ''}
                    onChange={(e) => handleFeedbackChange(report.id, e.target.value)}
                    className="w-full p-2 border border-stone-200 rounded-lg resize-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 text-sm"
                    rows={2}
                    placeholder="フィードバックを入力..."
                  />
                </td>
                <td className="py-4 px-6">
                  <div className="text-sm text-stone-500">
                    {report.updatedAt.toLocaleString('ja-JP')}
                  </div>
                </td>
                <td className="py-4 px-6">
                  {feedbackStates[report.id] !== report.feedback && (
                    <button
                      onClick={() => handleSaveFeedback(report.id)}
                      className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg hover:bg-emerald-200 transition-colors duration-200 text-sm font-medium"
                    >
                      保存
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
