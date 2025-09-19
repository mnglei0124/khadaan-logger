import React from 'react';

interface LogEntry {
  id: string;
  reportId: string;
  reportName: string;
  status: '完了' | 'エラー' | '停止';
  feedback: string;
  timestamp: Date;
}

interface LogEntryItemProps {
  log: LogEntry;
  statusColors: Record<string, string>;
}

export default function LogEntryItem({ log, statusColors }: LogEntryItemProps) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-stone-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-stone-800">{log.reportName}</h3>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[log.status]}`}>
            {log.status}
          </span>
          <span className="text-sm text-stone-500">
            {log.timestamp.toLocaleString('ja-JP')}
          </span>
        </div>
      </div>
      <p className="text-stone-600">{log.feedback}</p>
    </div>
  );
}
