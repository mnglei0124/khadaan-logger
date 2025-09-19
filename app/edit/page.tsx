'use client';
import React, { useState } from 'react';
import { useReport } from '../../context/ReportContext';
import { Plus, Edit3, Trash2 } from 'lucide-react';
import { Report } from '../../types/Report';
import { statusColors, statusOptions } from '../../constants';

export default function EditPage() {
  const { reports, addReport, editingReport, setEditingReport, saveEditReport, deleteReport } = useReport();
  const [newReportName, setNewReportName] = useState('');

  const handleAddReport = async () => {
    await addReport(newReportName);
    setNewReportName('');
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-stone-800 mb-2">編集</h2>
        <p className="text-stone-600">レポートの追加・編集・削除ができます</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 mb-8">
        <h3 className="text-lg font-semibold text-stone-800 mb-4">新しいレポートを追加</h3>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="レポート名を入力..."
            value={newReportName}
            onChange={(e) => setNewReportName(e.target.value)}
            className="flex-1 px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-200 focus:border-amber-300"
            onKeyPress={(e) => e.key === 'Enter' && handleAddReport()}
          />
          <button
            onClick={handleAddReport}
            className="px-6 py-3 bg-amber-200 text-amber-800 rounded-lg hover:bg-amber-300 transition-colors duration-200 flex items-center gap-2"
          >
            <Plus size={20} />
            追加
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {reports.map((report) => (
          <div key={report.id} className="bg-white rounded-xl p-5 shadow-sm border border-stone-100">
            {editingReport?.id === report.id ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editingReport.name}
                  onChange={(e) => setEditingReport({ ...editingReport, name: e.target.value })}
                  className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-200 focus:border-amber-300"
                />
                <select
                  value={editingReport.status}
                  onChange={(e) => setEditingReport({ ...editingReport, status: e.target.value as Report["status"] })}
                  className="px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-200 focus:border-amber-300"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <textarea
                  value={editingReport.feedback}
                  onChange={(e) => setEditingReport({ ...editingReport, feedback: e.target.value })}
                  className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-200 focus:border-amber-300"
                  rows={3}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => saveEditReport(editingReport)}
                    className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-lg hover:bg-emerald-200 transition-colors duration-200"
                  >
                    保存
                  </button>
                  <button
                    onClick={() => setEditingReport(null)}
                    className="px-4 py-2 bg-stone-100 text-stone-700 rounded-lg hover:bg-stone-200 transition-colors duration-200"
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-stone-800 mb-1">{report.name}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[report.status]}`}>
                    {report.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingReport(report)}
                    className="p-2 text-stone-600 hover:bg-stone-100 rounded-lg transition-colors duration-200"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => deleteReport(report.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
