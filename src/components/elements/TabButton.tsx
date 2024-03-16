import React from 'react';
import { makeStyles } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from '@mui/material';

// const useStyles = makeStyles({
//   root: {
//     flexGrow: 1,
//   },
// });

export default function CenteredTabs() {
//   const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue:number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{color:"#2A2B27"}}>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
      >
        <Tab label="BKC" />
        <Tab label="OIC" />
        <Tab label="KIC" />
      </Tabs>
    </Box>
  );
}
