// File: DataContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { ExcelRecord } from '../utils/types';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/db';

interface DataContextProps {
  children: ReactNode;
}

interface DataContextValue {
  data: ExcelRecord[];
  setExcelData: (excelData: ExcelRecord[]) => void;
  fetchDataFromFirestore: () => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export const DataProvider: React.FC<DataContextProps> = ({ children }) => {
  const [data, setData] = useState<ExcelRecord[]>([]);

  const setExcelData = (excelData: ExcelRecord[]) => {
    setData(excelData);
  };

  const fetchDataFromFirestore = async () => {
    const firestoreCollection = collection(db, 'excelData');

    try {
      const querySnapshot = await getDocs(firestoreCollection);

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // console.log('Data from Firestore:', data);
      // @ts-ignore
      setExcelData(data);
      // return data;
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
      return [];
    }
  };

  const value: DataContextValue = {
    data,
    setExcelData,
    fetchDataFromFirestore,
  };

  return (
    <DataContext.Provider value={value}> {children} </DataContext.Provider>
  );
};

export const useData = (): DataContextValue => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }

  return context;
};
