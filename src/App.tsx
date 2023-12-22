import TableFormat from './components/Table';
import { useData } from './context/ExcelDataProvider';

import { useEffect, useState } from 'react';
import { Box, Switch } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  const { data, fetchDataFromFirestore } = useData();
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    fetchDataFromFirestore();
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          margin: '1rem',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <MdLightMode />
          <Switch
            checked={isDarkTheme}
            onChange={toggleTheme}
            color='default'
          />
          <MdDarkMode />
        </Box>
        <TableFormat excelData={data} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
