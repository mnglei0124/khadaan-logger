import { db } from './firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { ReportData, Report } from '../types/Report';

const reportsCollectionRef = collection(db, 'reports');


// Create Report
const addReport = async (report: ReportData) => {
  try {
    const docRef = await addDoc(reportsCollectionRef, report);
    return { id: docRef.id, ...report };
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

// Read Reports
const getReports = async (): Promise<Report[]> => {
  try {
    const q = query(reportsCollectionRef, orderBy('updatedAt', 'desc'));
    const data = await getDocs(q);
    return data.docs.map((doc) => ({
      ...(doc.data() as ReportData),
      id: doc.id,
      createdAt: doc.data().createdAt.toDate(), // Convert Firebase Timestamp to JS Date
      updatedAt: doc.data().updatedAt.toDate(), // Convert Firebase Timestamp to JS Date
    }));
  } catch (e) {
    console.error("Error getting documents: ", e);
    throw e;
  }
};

// Update Report
const updateReport = async (id: string, updatedFields: Partial<ReportData>) => {
  try {
    const reportDoc = doc(db, 'reports', id);
    await updateDoc(reportDoc, updatedFields);
    return { id, ...updatedFields };
  } catch (e) {
    console.error("Error updating document: ", e);
    throw e;
  }
};

// Delete Report
const deleteReport = async (id: string) => {
  try {
    const reportDoc = doc(db, 'reports', id);
    await deleteDoc(reportDoc);
    return id;
  } catch (e) {
    console.error("Error deleting document: ", e);
    throw e;
  }
};

export { addReport, getReports, updateReport, deleteReport };
