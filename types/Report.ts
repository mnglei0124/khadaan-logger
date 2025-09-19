export interface ReportData {
  name: string;
  status: "完了" | "エラー" | "停止";
  feedback: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Report extends ReportData {
  id: string;
}
