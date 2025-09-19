import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';

const reportsCollectionRef = collection(db, 'reports');

export interface ReportData {
  name: string;
  status: '完了' | 'エラー' | '停止';
  feedback: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Report extends ReportData {
  id: string;
}
