import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Box } from '@mui/material';

// const useStyles = makeStyles({
//   root: {
//     flexGrow: 1,
//   },
// });

export default function CenteredTabs() {
//   const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue:number) => {
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
