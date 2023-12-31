import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { ExcelData } from "./types";
import { db } from "../firebase/db";
import toast from "react-hot-toast";

export const uploadDataToFirestore = async (jsonData: ExcelData[]) => {
  const firestoreCollection = collection(db, 'excelData');
  let duplicateErrorShown = false;

  for (const record of jsonData) {
    const id = record[0];

    if (id !== undefined && String(id) !== 'id') {
      // Check for duplicate documents with the same 'id'
      const duplicateQuery = query(
        firestoreCollection,
        where('id', '==', id)
      );

      const duplicateDocs = await getDocs(duplicateQuery);

      if (duplicateDocs.empty) {
        // If no duplicate documents found, add the record to Firestore
        try {
          const [recordId, firstName, lastName, email, gender, address, mobile] = record;

          await addDoc(firestoreCollection, {
            id: recordId,
            firstName,
            lastName,
            email,
            gender,
            address,
            mobile,
          });

        } catch (error) {
          console.error('Error uploading record:', error);
        }
      } else {
        if (!duplicateErrorShown) {
          console.warn(`Duplicate record found for id: ${id}`);
          toast.error('Duplicate record found');
          duplicateErrorShown = true;
        }
      }
    } else {
      console.warn('Invalid or duplicate id found in the record:', record);
    }
  }

  console.log('Data upload to Firestore completed.');
  toast.success('Successfully added data');

};
