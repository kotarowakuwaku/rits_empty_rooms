import React from 'react';
import Tabs, { TabsProps } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from '@mui/material';

interface TabButtonProps {
  leftName: string;
  centerName: string;
  rightName: string;
  value: string;
  onChange?: TabsProps['onChange'];
}

export default function TabButton({ leftName = '', centerName = '', rightName = '', value = '', onChange = () => {}  }: TabButtonProps) {
  return (
    <Box sx={{color:"#2A2B27"}}>
      <Tabs
        value={value}
        onChange={onChange}
        centered
      >
        <Tab label={leftName} value={leftName}/>
        <Tab label={centerName} value={centerName}/>
        <Tab label={rightName} value={rightName}/>
      </Tabs>
    </Box>
  );
}
