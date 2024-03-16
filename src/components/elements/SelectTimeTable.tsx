import * as React from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from '@mui/material/ToggleButtonGroup';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    margin: theme.spacing(1),
    border: 0,
    borderRadius: theme.shape.borderRadius,
    [`&.${toggleButtonGroupClasses.disabled}`]: {
      border: 0,
    },
  },
  [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
    {
      marginmon: -1,
      bordermon: '1px solid transparent',
    },
}));

export default function CustomizedDividers() {
  const [alignment, setAlignment] = React.useState('mon');
  const [formats, setFormats] = React.useState(() => ['italic']);

  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[],
  ) => {
    setFormats(newFormats);
  };

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <div>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          border: (theme) => `1px solid ${theme.palette.divider}`,
          flexWrap: 'wrap',
          width:'fit-content'
        }}
      >
        <StyledToggleButtonGroup
          size="medium"
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton value="mon" aria-label="mon">
            月
          </ToggleButton>
          <ToggleButton value="tue" aria-label="tue">
            火
          </ToggleButton>
          <ToggleButton value="wed" aria-label="wed">
            水
          </ToggleButton>
          <ToggleButton value="thu" aria-label="thu" >
            木
          </ToggleButton>
          <ToggleButton value="fri" aria-label="fri" >
            金
          </ToggleButton>
        </StyledToggleButtonGroup>
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
        <StyledToggleButtonGroup
          size="medium"
          value={formats}
          exclusive
          onChange={handleFormat}
          aria-label="text formatting"
        >
          <ToggleButton value="bold" aria-label="bold">
            1
          </ToggleButton>
          <ToggleButton value="italic" aria-label="italic">
            2
          </ToggleButton>
          <ToggleButton value="underlined" aria-label="underlined">
            3
          </ToggleButton>
          <ToggleButton value="color" aria-label="color">
            4
          </ToggleButton>
          <ToggleButton value="colo" aria-label="color">
            5
          </ToggleButton>
          <ToggleButton value="col" aria-label="color">
            6
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Paper>
    </div>
  );
}