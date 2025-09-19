"use client";
import React, { useState } from "react";
import { useReport } from "../../context/ReportContext";
import { Search } from "lucide-react";
import LogEntryItem from "../../components/LogEntryItem";
import { statusColors, statusOptions } from "../../constants";

export default function LogsPage() {
  const { logs } = useReport();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState("");

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = log.reportName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || log.status === filterStatus;
    const matchesDate =
      !dateFilter || log.timestamp.toISOString().split("T")[0] === dateFilter;
    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-stone-800 mb-2">ログ一覧</h2>
        <p className="text-stone-600">全てのレポートログを確認できます</p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"
            size={20}
          />
          <input
            type="text"
            placeholder="レポート名で検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-200 focus:border-amber-300"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-200 focus:border-amber-300"
        >
          <option value="all">全てのステータス</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-200 focus:border-amber-300"
        />
      </div>

      <div className="space-y-4">
        {filteredLogs.map((log) => (
          <LogEntryItem key={log.id} log={log} statusColors={statusColors} />
        ))}
      </div>
    </div>
  );
}
