export interface LogEntry {
  id: string;
  reportId: string;
  reportName: string;
  status: '完了' | 'エラー' | '停止';
  feedback: string;
  timestamp: Date;
}
