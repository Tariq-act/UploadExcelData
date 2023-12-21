import { useEffect } from 'react';
import './App.css';
import FileUpload from './components/FileUploader';
import TableFormat from './components/Table';
import { useData } from './context/ExcelDataProvider';
import { Box } from '@mui/material';

function App() {
  const { data, fetchDataFromFirestore } = useData();

  useEffect(() => {
    fetchDataFromFirestore();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <FileUpload />
      <TableFormat excelData={data} />
    </Box>
  );
}

export default App;
