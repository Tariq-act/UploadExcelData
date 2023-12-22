import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  TextField,
  Box,
} from '@mui/material';
import { useState } from 'react';
import FileUpload from './FileUploader';

interface DataType {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  address: string;
  mobile: string;
}

const TableFormat = ({ excelData }: { excelData: DataType[] }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const sortedData = excelData
    .slice()
    .sort((a: DataType, b: DataType) => a.id - b.id);

  const filteredData = sortedData.filter((row: DataType) =>
    row.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // sx={{ maxWidth: 300, margin: 'auto', marginBottom: '1rem' }}
  return (
    <Box
      sx={{
        '@media (max-width: 800px)': {
          maxWidth: '100%',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '1rem',
          gap: '1rem',
        }}
      >
        <Box>
          <TextField
            id='outlined-search'
            label='Search field'
            type='search'
            size='small'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
        <FileUpload />
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          margin: 'auto',
          minWidth: '100%',
        }}
      >
        <Table
          aria-label='simple table'
          sx={{ maxWidth: '100%', margin: 'auto' }}
        >
          <TableHead>
            <TableRow sx={{ fontWeight: 'bold' }}>
              <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                ID
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                First Name
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                Last Name
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                Email
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                Gender
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                Address
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                Mobile
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row: DataType) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='left'>{row.id}</TableCell>
                <TableCell align='left'>{row.firstName}</TableCell>
                <TableCell align='left'>{row.lastName}</TableCell>
                <TableCell align='left'>{row.email}</TableCell>
                <TableCell align='left'>{row.gender}</TableCell>
                <TableCell align='left'>{row.address}</TableCell>
                <TableCell align='left'>{row.mobile}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableFormat;
