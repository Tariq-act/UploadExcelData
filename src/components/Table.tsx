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

  return (
    <Box>
      <Box sx={{ maxWidth: 300, margin: 'auto', marginBottom: '1rem' }}>
        <TextField
          id='outlined-search'
          label='Search field'
          type='search'
          fullWidth
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: '900px', margin: 'auto' }}
      >
        <Table
          aria-label='simple table'
          sx={{ maxWidth: '100%', margin: 'auto' }}
        >
          <TableHead>
            <TableRow>
              <TableCell align='center'>ID</TableCell>
              <TableCell align='center'>First Name</TableCell>
              <TableCell align='center'>Last Name</TableCell>
              <TableCell align='center'>Email</TableCell>
              <TableCell align='center'>Gender</TableCell>
              <TableCell align='center'>Address</TableCell>
              <TableCell align='center'>Mobile</TableCell>
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
