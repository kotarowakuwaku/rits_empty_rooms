import * as React from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import ToggleButton, { ToggleButtonProps } from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";
import { TimeTable } from "@/types/TimeTable";

interface TabButtonProps extends TimeTable {
  timeValue: number;
  dayValue: string;
  timeOnChange?: ToggleButtonProps["onChange"];
  dayOnChange?: ToggleButtonProps["onChange"];
}

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
      bordermon: "1px solid transparent",
    },
}));

export default function TimeTableToggleButton({
  mon = "",
  tue = "",
  wed = "",
  thu = "",
  fri = "",
  one = 0,
  two = 0,
  three = 0,
  four = 0,
  five = 0,
  six = 0,
  timeValue = 0,
  dayValue = "",
  timeOnChange = () => {},
  dayOnChange = () => {},
}: TabButtonProps) {
  return (
    <div>
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          border: (theme) => `1px solid ${theme.palette.divider}`,
          flexWrap: "wrap",
          width: "fit-content",
        }}
      >
        <StyledToggleButtonGroup
          size="medium"
          value={dayValue}
          exclusive
          onChange={dayOnChange}
          aria-label="text alignment"
        >
          <ToggleButton value={mon} aria-label="mon">
            月
          </ToggleButton>
          <ToggleButton value={tue} aria-label="tue">
            火
          </ToggleButton>
          <ToggleButton value={wed} aria-label="wed">
            水
          </ToggleButton>
          <ToggleButton value={thu} aria-label="thu">
            木
          </ToggleButton>
          <ToggleButton value={fri} aria-label="fri">
            金
          </ToggleButton>
        </StyledToggleButtonGroup>
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
        <StyledToggleButtonGroup
          size="medium"
          value={timeValue}
          exclusive
          onChange={timeOnChange}
          aria-label="text formatting"
        >
          <ToggleButton value={one} aria-label="1">
            {one}
          </ToggleButton>
          <ToggleButton value={two} aria-label="2">
            {two}
          </ToggleButton>
          <ToggleButton value={three} aria-label="3">
            {three}
          </ToggleButton>
          <ToggleButton value={four} aria-label="4">
            {four}
          </ToggleButton>
          <ToggleButton value={five} aria-label="5">
            {five}
          </ToggleButton>
          <ToggleButton value={six} aria-label="6">
            {six}
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Paper>
    </div>
  );
}
