/* eslint-disable react-hooks/rules-of-hooks */
import * as XLSX from 'xlsx';
import { ExcelData } from './types';
import { uploadDataToFirestore } from './uploadToFirestore';


export const handleUpload = async (file: File,) => {

  if (!file) {
    console.error('No file selected.');
    return;
  }

  try {
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = event?.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json<ExcelData>(sheet, {
        header: 1,
      });

      console.log(jsonData);

      uploadDataToFirestore(jsonData);

    };

    reader.readAsBinaryString(file);
  } catch (error) {
    console.error('Error reading the Excel file:', error);
  }
};