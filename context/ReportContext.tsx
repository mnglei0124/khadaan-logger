'use client';
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Report, ReportData } from '../types/Report';
import { LogEntry } from '../types/LogEntry';
import { statusOptions } from '../constants';
import { getReports, addReport, updateReport, deleteReport as firestoreDeleteReport } from '../lib/firestoreService.ts';
import { auth } from '../lib/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';

interface ReportContextType {
  reports: Report[];
  logs: LogEntry[];
  viewMode: 'cards' | 'table';
  setViewMode: (mode: 'cards' | 'table') => void;
  updateReportStatus: (reportId: string, newStatus: Report["status"]) => Promise<void>;
  updateReportFeedback: (reportId: string, feedback: string) => Promise<void>;
  addReport: (newReportName: string) => Promise<void>;
  deleteReport: (reportId: string) => Promise<void>;
  saveEditReport: (updatedReport: Report) => Promise<void>;
  user: User | null;
  loadingAuth: boolean;
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export const ReportProvider = ({ children }: { children: ReactNode }) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Listen for Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch reports on component mount (only if authenticated)
  useEffect(() => {
    if (user) {
      const fetchReports = async () => {
        try {
          const fetchedReports = await getReports();
          setReports(fetchedReports);
        } catch (error) {
          console.error("Error fetching reports: ", error);
        }
      };
      fetchReports();
    } else if (!loadingAuth) {
      setReports([]); // Clear reports if not authenticated and not loading
    }
  }, [user, loadingAuth]);

  // Generate logs from reports
  useEffect(() => {
    const generatedLogs: LogEntry[] = [];
    reports.forEach(report => {
      // Generate some historical logs (for demonstration purposes)
      for (let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));
        generatedLogs.push({
          id: `${report.id}-${i}`,
          reportId: report.id,
          reportName: report.name,
          status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
          feedback: `ログエントリー ${i + 1}`,
          timestamp: date
        });
      }
    });
    setLogs(generatedLogs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));
  }, [reports]);

  const handleUpdateReportStatus = async (reportId: string, newStatus: Report["status"]) => {
    try {
      await updateReport(reportId, { status: newStatus, updatedAt: new Date() });
      setReports(prev => prev.map(report => 
        report.id === reportId 
          ? { ...report, status: newStatus, updatedAt: new Date() }
          : report
      ));
    } catch (error) {
      console.error("Error updating report status: ", error);
    }
  };

  const handleUpdateReportFeedback = async (reportId: string, feedback: string) => {
    try {
      await updateReport(reportId, { feedback, updatedAt: new Date() });
      setReports(prev => prev.map(report => 
        report.id === reportId 
          ? { ...report, feedback, updatedAt: new Date() }
          : report
      ));
    } catch (error) {
      console.error("Error updating report feedback: ", error);
    }
  };

  const handleAddReport = async (name: string) => {
    if (name.trim()) {
      const newReportData: ReportData = {
        name: name.trim(),
        status: '停止',
        feedback: '',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      try {
        const addedReport = await addReport(newReportData);
        setReports(prev => [...prev, addedReport]);
      } catch (error) {
        console.error("Error adding report: ", error);
      }
    }
  };

  const handleDeleteReport = async (reportId: string) => {
    try {
      await firestoreDeleteReport(reportId);
      setReports(prev => prev.filter(report => report.id !== reportId));
      setLogs(prev => prev.filter(log => log.reportId !== reportId));
    } catch (error) {
      console.error("Error deleting report: ", error);
    }
  };

  const handleSaveEditReport = async (updatedReport: Report) => {
    try {
      const { id, ...updatedFields } = updatedReport;
      await updateReport(id, { ...updatedFields, updatedAt: new Date() });
      setReports(prev => prev.map(report => 
        report.id === updatedReport.id ? { ...updatedReport, updatedAt: new Date() } : report
      ));
    } catch (error) {
      console.error("Error saving edited report: ", error);
    }
  };

  return (
    <ReportContext.Provider
      value={{
        reports,
        logs,
        viewMode,
        setViewMode,
        updateReportStatus: handleUpdateReportStatus,
        updateReportFeedback: handleUpdateReportFeedback,
        addReport: handleAddReport,
        deleteReport: handleDeleteReport,
        saveEditReport: handleSaveEditReport,
        user,
        loadingAuth,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export const useReport = () => {
  const context = useContext(ReportContext);
  if (context === undefined) {
    throw new Error('useReport must be used within a ReportProvider');
  }
  return context;
};
