import { ChangeEvent, useEffect, useState } from 'react';

import { Box, Button, Input, InputLabel, Typography } from '@mui/material';
import { handleUpload } from '../utils/convertExcelToJson';
import { useData } from '../context/ExcelDataProvider';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { MdAttachFile } from 'react-icons/md';

const UploadExcelToFirestore = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // New state for loading indicator
  const [uploadStatus, setUploadStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const { fetchDataFromFirestore } = useData();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    }
  };

  const handleUploadClick = async () => {
    if (file) {
      try {
        setIsLoading(true);
        await handleUpload(file);
        setUploadStatus('success');
      } catch (error) {
        console.error('Error during file upload:', error);
        setUploadStatus('error');
      } finally {
        setIsLoading(false);
        setFile(null);
      }
    }
  };

  useEffect(() => {
    if (uploadStatus === 'success' || uploadStatus === 'error') {
      fetchDataFromFirestore();
    }
  }, [fetchDataFromFirestore, uploadStatus]);

  return (
    <Box display='flex' alignItems='center'>
      <InputLabel htmlFor='file-input'>
        <Button
          variant='contained'
          component='span'
          startIcon={<MdAttachFile />}
        >
          Choose File
        </Button>
      </InputLabel>
      <Input
        id='file-input'
        type='file'
        inputProps={{ accept: '.xls, .xlsx' }}
        onChange={handleFileChange}
        sx={{ display: 'none' }}
      />
      <Button
        variant='contained'
        disabled={!file || isLoading}
        onClick={handleUploadClick}
        style={{ marginLeft: '16px' }}
      >
        Upload
      </Button>
      {isLoading && <Typography>Loading...</Typography>}
      {file && (
        <Box ml={2}>
          <Typography variant='body2' color='textSecondary'>
            Selected File: {file.name}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default UploadExcelToFirestore;
