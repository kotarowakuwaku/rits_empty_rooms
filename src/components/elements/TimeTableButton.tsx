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
  timeOnChange?: ToggleButtonProps["onChange"];
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
  one = 0,
  two = 0,
  three = 0,
  four = 0,
  five = 0,
  six = 0,
  timeValue = 0,
  timeOnChange = () => {},
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
          justifyContent: "center",
        }}
      >
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
