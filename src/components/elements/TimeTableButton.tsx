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
    border: "1px solid",
  },
}));

const buttonStyle = {
  margin: "0",
  padding: "0",
  width: "80px",
  height: "39px",
  fontSize: "1.5rem",
  "@media screen and (max-width:480px)": {
    width: "53px",
    height: "26px",
  },
};

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
          border: "1px solid",
          flexWrap: "wrap",
          width: "fit-content",
          justifyContent: "center",
          margin: "0 10px",
        }}
      >
        <StyledToggleButtonGroup
          value={timeValue}
          exclusive
          onChange={timeOnChange}
          aria-label="text formatting"
        >
          <ToggleButton value={one} aria-label="1" sx={buttonStyle}>
            {one}
          </ToggleButton>
          <ToggleButton value={two} aria-label="2" sx={buttonStyle}>
            {two}
          </ToggleButton>
          <ToggleButton value={three} aria-label="3" sx={buttonStyle}>
            {three}
          </ToggleButton>
          <ToggleButton value={four} aria-label="4" sx={buttonStyle}>
            {four}
          </ToggleButton>
          <ToggleButton value={five} aria-label="5" sx={buttonStyle}>
            {five}
          </ToggleButton>
          <ToggleButton value={six} aria-label="6" sx={buttonStyle}>
            {six}
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Paper>
    </div>
  );
}
