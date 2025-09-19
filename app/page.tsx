'use client';
import React from 'react';
import { useReport } from '../context/ReportContext';
import { Grid3X3, List } from 'lucide-react';
import ReportCard from '../components/ReportCard';
import ReportTable from '../components/ReportTable';
import { statusColors, statusOptions } from '../constants';

export default function Home() {
  const { reports, viewMode, setViewMode, updateReportStatus, updateReportFeedback } = useReport();

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-3xl font-bold text-stone-800">レポート管理</h2>
          <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm border border-stone-200">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-2 rounded-md transition-all duration-200 ${viewMode === 'cards' ? 'bg-amber-100 text-amber-800 shadow-sm' : 'text-stone-600 hover:bg-stone-50'}`}
            >
              <Grid3X3 size={18} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-md transition-all duration-200 ${viewMode === 'table' ? 'bg-amber-100 text-amber-800 shadow-sm' : 'text-stone-600 hover:bg-stone-50'}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
        <p className="text-stone-600">現在のレポート状況を確認・更新できます</p>
      </div>

      {viewMode === 'cards' ? (
        <div className="grid gap-6">
          {reports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              statusColors={statusColors}
              statusOptions={statusOptions}
              updateReportStatus={updateReportStatus}
              updateReportFeedback={updateReportFeedback}
            />
          ))}
        </div>
      ) : (
        <ReportTable
          reports={reports}
          statusColors={statusColors}
          statusOptions={statusOptions}
          updateReportStatus={updateReportStatus}
          updateReportFeedback={updateReportFeedback}
        />
      )}
    </div>
  );
}
